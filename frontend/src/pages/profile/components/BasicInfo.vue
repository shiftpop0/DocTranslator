<template>
  <div class="basic-info-container">
    <div class="section-header">
      <h3>账户概览</h3>
      <p class="subtitle">查看您的账户状态和资源使用情况</p>
    </div>

    <!-- 存储空间卡片 -->
    <div class="storage-card">
      <div class="storage-header">
        <div class="label">
          <el-icon><Files /></el-icon> 云端存储空间
        </div>
        <div class="value">{{ formattedStorage }} / {{ formattedAllStorage }}</div>
      </div>

      <div class="progress-wrapper">
        <el-progress
          :percentage="storagePercentage"
          :stroke-width="12"
          :color="customColors"
          :show-text="false"
          class="custom-progress"
        />
      </div>

      <div class="storage-footer">
        <span class="usage-text">已使用 {{ storagePercentage }}%</span>
        <el-button v-if="userInfo.level !== 'vip'" type="primary" link @click="upgradeStorage">
          升级空间 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </div>

    <el-divider border-style="dashed" />
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { formatTime } from '@/utils/tools'
import { Files, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const props = defineProps({
  userInfo: { type: Object, required: true }
})
const { userInfo } = toRefs(props)

const storagePercentage = computed(() => {
  if (!userInfo.value.total_storage) return 0
  const p = (userInfo.value.storage / userInfo.value.total_storage) * 100
  return Math.min(100, parseFloat(p.toFixed(2)))
})

const formattedStorage = computed(() => (userInfo.value.storage / (1024 * 1024)).toFixed(2) + ' MB')
const formattedAllStorage = computed(
  () => (userInfo.value.total_storage / (1024 * 1024)).toFixed(2) + ' MB'
)

const customColors = [
  { color: '#67c23a', percentage: 60 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#f56c6c', percentage: 100 }
]

const upgradeStorage = () => ElMessage.info('请联系管理员扩容')
</script>

<style scoped lang="scss">
.basic-info-container {
  padding: 10px;
}

.section-header {
  margin-bottom: 30px;
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 8px 0;
  }
  .subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin: 0;
  }
}

.storage-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;

  .storage-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;

    .label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #475569;
      font-weight: 500;
    }
    .value {
      color: #1e293b;
      font-weight: 600;
    }
  }

  .progress-wrapper {
    margin-bottom: 12px;
    :deep(.el-progress-bar__outer) {
      background-color: #e2e8f0;
    }
  }

  .storage-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;

    .usage-text {
      color: #64748b;
    }
  }
}
</style>
