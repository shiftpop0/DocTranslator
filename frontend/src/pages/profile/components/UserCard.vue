<template>
  <div class="user-hero-card" :class="{ 'is-vip': userInfo.level === 'vip' }">
    <div class="card-bg-pattern"></div>

    <div class="user-content">
      <div class="avatar-section">
        <!-- <div class="avatar-ring"> -->
        <el-avatar :size="80" :src="userInfo.avatar || defaultAvatar" />
        <!-- <el-avatar :size="80" :src="defaultAvatar" /> -->
        <!-- </div> -->
        <div v-if="userInfo.level === 'vip'" class="vip-badge-float">
          <img src="@/assets/vip.png" alt="VIP" />
        </div>
      </div>

      <div class="info-section">
        <div class="name-row">
          <h2 class="username">{{ userInfo.name || userInfo.email }}</h2>
          <span class="role-tag" :class="userInfo.level">
            <el-icon v-if="userInfo.level === 'vip'"><Trophy /></el-icon>
            {{ userInfo.level === 'vip' ? '尊享会员' : '普通用户' }}
          </span>
        </div>

        <div class="meta-grid">
          <!-- <div class="meta-item">
            <el-icon><Message /></el-icon>
            <span>{{ userInfo.email }}</span>
          </div> -->
          <div class="meta-item">
            <el-icon><Calendar /></el-icon>
            <span>注册于 {{ formatTime(userInfo.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatTime } from '@/utils/tools'
import { Message, Calendar, Trophy } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/avator.png'
defineProps({
  userInfo: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<style scoped lang="scss">
.user-hero-card {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 24px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease;

  /* 背景装饰 */
  .card-bg-pattern {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background: radial-gradient(circle at top right, #e0f2fe 0%, transparent 70%);
    opacity: 0.6;
    z-index: 0;
  }

  &.is-vip {
    background: linear-gradient(to right, #fff, #fffbf0);
    border: 1px solid rgba(255, 215, 0, 0.2);

    .card-bg-pattern {
      background: radial-gradient(circle at top right, #fff8e1 0%, transparent 70%);
    }
  }

  .user-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 24px;
  }
}

.avatar-section {
  position: relative;

  .vip-badge-float {
    position: absolute;
    bottom: 0;
    right: -4px;
    width: 28px;
    height: 28px;
    padding: 2px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.info-section {
  flex: 1;

  .name-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;

    .username {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .role-tag {
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
      background: #f1f5f9;
      color: #64748b;

      &.vip {
        background: linear-gradient(135deg, #fce38a 0%, #f38181 100%);
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .meta-grid {
    display: flex;
    gap: 24px;
    color: #64748b;
    font-size: 14px;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}

@media (max-width: 576px) {
  .user-hero-card {
    padding: 20px;

    .user-content {
      flex-direction: column;
      text-align: center;
    }

    .name-row {
      justify-content: center;
      flex-wrap: wrap;
    }

    .meta-grid {
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }
  }
}
</style>
