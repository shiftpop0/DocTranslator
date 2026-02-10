# resources/system.py
from flask_restful import Resource
from app.utils.response import APIResponse
from flask import current_app


class SystemVersionResource(Resource):
    def get(self):
        """获取系统版本信息[^1]"""
        return APIResponse.success({
            'version': current_app.config['SYSTEM_VERSION'],
            'message': 'success'
        })


from app.models.setting import Setting
from app import db

class SystemSettingsResource(Resource):
    def get(self):
        """获取全量系统配置[^2]"""
        # Fetch welcome message from database
        welcome_message_setting = Setting.query.filter_by(alias='welcome_message').first()
        welcome_message = welcome_message_setting.value if welcome_message_setting else 'Welcome！请勿处理涉密信息'

        welcome_color_setting = Setting.query.filter_by(alias='welcome_message_color').first()
        welcome_color = welcome_color_setting.value if welcome_color_setting else 'red'

        welcome_size_setting = Setting.query.filter_by(alias='welcome_message_size').first()
        welcome_size = welcome_size_setting.value if welcome_size_setting else '24px'

        return APIResponse.success({
            'site_setting': {
                'version': current_app.config['SYSTEM_VERSION'],
                'site_name': current_app.config['SITE_NAME'],
                'welcome_message': welcome_message,
                'welcome_message_color': welcome_color,
                'welcome_message_size': welcome_size
            },
            'api_setting': {
                'api_url': current_app.config['API_URL'],
                'models': current_app.config['TRANSLATE_MODELS']
            },
            'message': 'success'
        })
