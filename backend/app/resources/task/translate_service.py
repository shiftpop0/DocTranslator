import logging
import os
from datetime import datetime
from threading import Thread
from flask import current_app
from app.models.translate import Translate
from app.extensions import db
from .main import main_wrapper
from ...models.comparison import Comparison
from ...models.prompt import Prompt
import pytz


class TranslateEngine:
    def __init__(self, task_id):
        self.task_id = task_id
        self.app = current_app._get_current_object()  # 获取真实app对象

    def execute(self):
        """启动翻译任务入口"""
        try:
            # 在主线程上下文中准备任务
            with self.app.app_context():
                task = self._prepare_task()

            # 启动线程时传递真实app对象和任务ID
            thr = Thread(
                target=self._async_wrapper,
                args=(self.app, self.task_id)
            )
            thr.start()
            return True
        except Exception as e:
            self.app.logger.error(f"任务初始化失败: {str(e)}", exc_info=True)
            return False

    def _async_wrapper(self, app, task_id):
        """异步执行包装器"""
        with app.app_context():
            from app.extensions import db  # 确保在每个线程中导入
            try:
                # 使用新会话获取任务对象
                task = db.session.query(Translate).get(task_id)
                if not task:
                    app.logger.error(f"任务 {task_id} 不存在")
                    return

                # 执行核心逻辑
                success = self._execute_core(task)
                self._complete_task(success)
            except Exception as e:
                app.logger.error(f"任务执行异常: {str(e)}", exc_info=True)
                self._complete_task(False)
            finally:
                db.session.remove()  # 清理线程局部session

    def _execute_core(self, task):
        """执行核心翻译逻辑"""
        try:
            # 初始化翻译配置
            self._init_translate_config(task)

            # 构建符合要求的 trans 字典
            trans_config = self._build_trans_config(task)

            # 调用 main_wrapper 执行翻译
            return main_wrapper(task_id=task.id, config=trans_config,
                                origin_path=task.origin_filepath)
        except Exception as e:
            current_app.logger.error(f"翻译执行失败: {str(e)}", exc_info=True)
            return False

    def _prepare_task(self):
        """准备翻译任务"""
        task = Translate.query.get(self.task_id)
        if not task:
            raise ValueError(f"任务 {self.task_id} 不存在")

        # 验证文件存在性
        if not os.path.exists(task.origin_filepath):
            raise FileNotFoundError(f"原始文件不存在: {task.origin_filepath}")

        # 更新任务状态
        task.status = 'process'
        task.start_at = datetime.now(pytz.timezone(self.app.config['TIMEZONE']))  # 使用配置的时区
        db.session.commit()
        return task

    def _build_trans_config(self, task):
        """构建符合文件处理器要求的 trans 字典"""
        config = {
            'id': task.id,  # 任务ID
            'target_lang': task.lang,
            'uuid': task.uuid,
            'target_path_dir': os.path.dirname(task.target_filepath),
            'threads': task.threads,
            'file_path': task.origin_filepath,
            'target_file': task.target_filepath,
            'api_url': task.api_url,
            'api_key': task.api_key,
            # 机器翻译相关
            'app_id': task.app_id,
            'app_key': task.app_key,
            'type': task.type,
            'lang': task.lang,
            'server': task.server,
            'run_complete': True,
            'model': task.model,
            'backup_model': task.backup_model,
            'comparison_id': task.comparison_id,
            'prompt_id': task.prompt_id,
            'prompt': self._get_final_prompt(task),
            'terms_dict': self._get_matched_terms(task) if task.comparison_id else None,
            'use_baidu_terms': self._should_use_baidu_terms(task),
            'extension': os.path.splitext(task.origin_filepath)[1]

        }

        return config

    def _get_final_prompt(self, task):
        """
        获取最终的prompt
        优先使用prompt_id对应的模板，其次使用task.prompt
        """
        # 如果有prompt_id，查询数据库
        if task.prompt_id and task.prompt_id != 0:
            try:
                prompt_obj = db.session.query(Prompt).filter_by(id=task.prompt_id).first()
                if prompt_obj and prompt_obj.content:
                    logging.info(f"[任务{task.id}] 使用提示词模板ID: {task.prompt_id}")
                    return prompt_obj.content
                else:
                    logging.warning(
                        f"[任务{task.id}] 提示词模板ID {task.prompt_id} 不存在或内容为空")
            except Exception as e:
                logging.error(f"[任务{task.id}] 获取提示词模板失败: {e}")

        # 使用任务中的prompt
        prompt = task.prompt or "请将以下文本翻译成{target_lang}，保持原文的格式和风格："

        logging.info(f"[任务{task.id}] 使用任务自带prompt")
        return prompt

    def _get_matched_terms(self, task):
        """
        获取术语库内容（用于AI翻译动态匹配）
        返回解析后的术语对列表
        """
        if not task.comparison_id or task.comparison_id == 0:
            logging.info(f"[任务{task.id}] 未设置术语库ID")
            return None

        logging.info(f"[任务{task.id}] 开始查询术语库ID: {task.comparison_id}")

        try:
            # 添加更详细的查询条件，确保未删除
            comparison = db.session.query(Comparison).filter(
                Comparison.id == task.comparison_id,
                Comparison.deleted_flag == 'N'
            ).first()

            if not comparison:
                logging.warning(f"[任务{task.id}] 术语库ID {task.comparison_id} 不存在或已删除")
                return None

            if not comparison.content or comparison.content.strip() == '':
                logging.warning(f"[任务{task.id}] 术语库ID {task.comparison_id} 内容为空")
                return None

            logging.info(
                f"[任务{task.id}] 找到术语库: {comparison.title}, 内容长度: {len(comparison.content)}")

            # 解析术语库内容
            terms_content = comparison.content.strip()
            term_pairs = []

            # 支持多种分隔符
            separator = ';'
            if ';' not in terms_content:
                if '\n' in terms_content:
                    separator = '\n'
                elif '|' in terms_content:
                    separator = '|'

            for term_pair in terms_content.split(separator):
                term_pair = term_pair.strip()
                if not term_pair:
                    continue

                # 支持多种格式：逗号、制表符、冒号
                if ',' in term_pair:
                    parts = term_pair.split(',', 1)
                elif '\t' in term_pair:
                    parts = term_pair.split('\t', 1)
                elif ':' in term_pair:
                    parts = term_pair.split(':', 1)
                else:
                    continue

                if len(parts) != 2:
                    continue

                source_term = parts[0].strip()
                target_term = parts[1].strip()

                if source_term and target_term:
                    term_pairs.append({
                        'source': source_term,
                        'target': target_term
                    })

            if term_pairs:
                logging.info(f"[任务{task.id}] 成功解析术语库，共 {len(term_pairs)} 个术语对")
                # 打印前几个术语对作为示例
                sample = term_pairs[:3]
                for i, pair in enumerate(sample):
                    logging.info(
                        f"[任务{task.id}] 术语示例{i + 1}: {pair['source']} → {pair['target']}")
                return term_pairs
            else:
                logging.warning(
                    f"[任务{task.id}] 术语库解析后为空，原始内容: {terms_content[:100]}...")
                return None

        except Exception as e:
            logging.error(f"[任务{task.id}] 获取术语库失败: {e}")
            import traceback
            traceback.print_exc()
            return None

    def _should_use_baidu_terms(self, task):
        """
        判断百度翻译是否启用术语库
        """
        if task.server != 'baidu':
            return False

        # 百度翻译：comparison_id=1表示启用术语库
        return task.comparison_id == 1

    def _init_translate_config(self, task):
        """初始化翻译配置"""
        if task.api_url and task.api_key:
            import openai
            openai.api_base = task.api_url
            openai.api_key = task.api_key

    def _complete_task(self, success):
        """更新任务状态"""
        try:
            task = db.session.query(Translate).get(self.task_id)
            if task:
                task.status = 'done' if success else 'failed'
                task.end_at = datetime.now(pytz.timezone(self.app.config['TIMEZONE']))  # 使用配置的时区
                task.process = 100.00 if success else 0.00
                db.session.commit()
        except Exception as e:
            db.session.rollback()
            self.app.logger.error(f"状态更新失败: {str(e)}", exc_info=True)


