<template>
  <div class="main-layout">
    <LayoutSidebar @openCreatePlan="handleOpenCreatePlan" />
    <div class="right-section">
      <LayoutHeader @openCreatePlan="handleOpenCreatePlan" />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/common/LayoutSidebar.vue'
import LayoutHeader from '@/components/common/LayoutHeader.vue'

const handleOpenCreatePlan = () => {
  // TODO: 后续接入 PlanFormModal 弹窗
  alert('新建计划弹窗（待实现）')
}
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  /* 添加背景图，仅限内容区域 */
  background:
    linear-gradient(rgba(255, 255, 255, 0.421), rgba(255, 255, 255, 0.483)),
    url('@/assets/images/背景图.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
