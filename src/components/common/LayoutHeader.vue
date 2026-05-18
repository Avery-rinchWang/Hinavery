<!-- 顶部栏 -->
<template>
  <header class="app-header">
    <div class="logo-placeholder"></div>

    <div class="header-actions">
      <!-- 新建计划按钮（自定义样式，无路由高亮） -->
      <button class="btn-primary-outline" @click="emit('openCreatePlan')">
        <el-icon><Plus /></el-icon>
        <span>新建计划</span>
      </button>

      <!-- 关于按钮（路由激活高亮） -->
      <button
        class="btn-text"
        :class="{ active: route.path === '/about' }"
        @click="router.push('/about')"
      >
        关于
      </button>

      <!-- 账号信息按钮（路由激活高亮） -->
      <button
        class="btn-text"
        :class="{ active: route.path === '/account' }"
        @click="router.push('/account')"
      >
        账号信息
      </button>

      <!-- 退出登录按钮（无高亮，危险样式） -->
      <button class="btn-text btn-danger" @click="handleLogout">退出登录</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'

const emit = defineEmits<{
  (e: 'openCreatePlan'): void
}>()

const router = useRouter()
const route = useRoute()

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  height: 60px;
  background-color: var(--bg-surface, #ffffff);
  box-shadow: var(--shadow-sm, 0 2px 8px rgba(43, 196, 186, 0.1));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 99;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border-color, #e0f0ef);
}

.logo-placeholder {
  width: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 基础按钮样式 */
button {
  font-family: inherit;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* 主要按钮（新建计划） */
.btn-primary-outline {
  background-color: transparent;
  border: 1px solid var(--primary-color, #2bc4ba);
  color: var(--primary-color, #2bc4ba);
}
.btn-primary-outline:hover {
  background-color: var(--primary-color, #2bc4ba);
  color: white;
}
.btn-primary-outline .el-icon {
  font-size: 16px;
}

/* 文本按钮（关于、账号信息、退出登录） */
.btn-text {
  color: var(--text-secondary, #5a7c7a);
}
.btn-text:hover {
  color: var(--primary-color, #2bc4ba);
  background-color: var(--primary-color-light, #e6f7f5);
}

/* 路由激活高亮 */
.btn-text.active {
  color: var(--primary-color, #2bc4ba);
  font-weight: 500;
  background-color: rgba(43, 196, 186, 0.1);
  border-radius: 6px;
}

/* 退出登录（危险样式） */
.btn-danger {
  color: var(--danger, #e87979);
}
.btn-danger:hover {
  background-color: rgba(232, 121, 121, 0.1);
  color: var(--danger, #e87979);
}

@media (max-width: 768px) {
  .header-actions {
    gap: 8px;
  }
  .btn-primary-outline span {
    display: none; /* 移动端只显示图标 */
  }
  .btn-primary-outline {
    padding: 6px 8px;
  }
  .btn-text {
    padding: 6px 8px;
  }
}
</style>
