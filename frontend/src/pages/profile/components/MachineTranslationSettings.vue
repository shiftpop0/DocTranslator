<template>
  <VipCard v-if="isVIP"></VipCard>
  <el-form v-else ref="formRef" :model="form" :rules="rules" label-width="120px" label-position="top">
    <el-form-item label="翻译引擎" prop="provider">
      <el-select v-model="form.provider" placeholder="选择翻译引擎">
        <el-option label="百度翻译" value="baidu" />
        <el-option label="有道翻译" value="youdao" />
        <el-option label="Google翻译" value="google" />
      </el-select>
    </el-form-item>

    <el-form-item label="App ID" prop="app_id">
      <el-input v-model="form.app_id" placeholder="输入应用ID" clearable />
    </el-form-item>

    <el-form-item label="App Key" prop="app_key">
      <el-input v-model="form.app_key" placeholder="输入应用密钥" show-password clearable />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import VipCard from './VipCard.vue'
import { useTranslateStore } from '@/store/translate'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const isVIP = computed(() => userStore.isVip)
const translateStore = useTranslateStore()
const formRef = ref(null)
const form = ref({})
onMounted(() => {
  form.value = {
    provider: 'baidu',
    app_id: translateStore.baidu.app_id,
    app_key: translateStore.baidu.app_key
  }
})
const rules = {
  provider: [{ required: true, message: '请选择翻译引擎', trigger: 'change' }],
  app_id: [{ required: true, message: '请输入App ID', trigger: 'blur' }],
  app_key: [{ required: true, message: '请输入App Key', trigger: 'blur' }]
}

const submitForm = async () => {
  try {
    await formRef.value.validate()
    translateStore.updateBaiduSettings({
      app_id: form.value.app_id,
      app_key: form.value.app_key
    })
    ElMessage.success('保存成功!')
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<style lang="scss" scoped>
/* VIP卡片响应式设计 */
.vip-card {
  position: relative;
  margin-bottom: 20px;
  padding: 2px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  box-shadow: 0 4px 12px rgba(253, 160, 133, 0.2);
  overflow: hidden;
}
.vip-card__content {
  position: relative;
  padding: 20px 15px;
  background: white;
  border-radius: 10px;
  z-index: 2;
}
/* 移动端优先的边角设计 */
.vip-card__corner {
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  z-index: 1;
}
.vip-card__corner--tl {
  top: 0;
  left: 0;
  clip-path: polygon(0 0, 0% 100%, 100% 0);
}
.vip-card__corner--tr {
  top: 0;
  right: 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}
.vip-card__corner--bl {
  bottom: 0;
  left: 0;
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}
.vip-card__corner--br {
  bottom: 0;
  right: 0;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
}
/* 响应式徽章 */
.vip-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  border-radius: 18px;
  color: white;
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 14px;
}
.crown-icon {
  margin-right: 6px;
  font-size: 14px;
}
/* 响应式文字大小 */
.vip-card__title {
  margin: 0 0 8px;
  font-size: 18px;
  color: #333;
  line-height: 1.3;
}
.vip-card__desc {
  margin: 0 0 15px;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
}
/* 响应式福利列表 */
.vip-card__benefits {
  display: grid;
  gap: 10px;
}
.benefit-item {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 13px;
}
.benefit-item .el-icon {
  margin-right: 6px;
  color: #f6d365;
  font-size: 14px;
}
/* 平板和桌面端适配 */
@media (min-width: 768px) {
  .vip-card {
    margin-bottom: 30px;
  }

  .vip-card__content {
    padding: 25px;
  }

  .vip-card__corner {
    width: 60px;
    height: 60px;
  }

  .vip-card__badge {
    padding: 6px 12px;
    font-size: 15px;
  }

  .crown-icon {
    font-size: 16px;
  }

  .vip-card__title {
    font-size: 20px;
  }

  .vip-card__desc {
    font-size: 14px;
  }

  .benefit-item {
    font-size: 14px;
  }
}
</style>
