<template>
  <div class="translation-settings-wrapper">
    <el-tabs v-model="activeTab" class="modern-tabs">
      <el-tab-pane label="AI 翻译" name="ai">
        <ai-translation-settings />
      </el-tab-pane>
      <el-tab-pane label="机器翻译" name="machine">
        <machine-translation-settings />
      </el-tab-pane>
      <el-tab-pane label="通用偏好设置" name="common">
        <common-settings />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AiTranslationSettings from './AiTranslationSettings.vue'
import MachineTranslationSettings from './MachineTranslationSettings.vue'
import CommonSettings from './CommonSettings.vue'
const activeTab = ref('ai')
</script>

<style scoped lang="scss">
.modern-tabs {
  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
    background-color: #e2e8f0;
  }

  :deep(.el-tabs__item) {
    font-size: 15px;
    color: #64748b;
    height: 48px;

    &.is-active {
      color: #3b82f6;
      font-weight: 600;
    }
  }

  :deep(.el-tabs__content) {
    overflow: visible;
  }
}
</style>
