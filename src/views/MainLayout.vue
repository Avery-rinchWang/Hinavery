<template>
  <div class="main-layout">
    <LayoutSidebar @openCreatePlan="handleOpenCreatePlan" />
    <div class="right-section">
      <LayoutHeader @openCreatePlan="handleOpenCreatePlan" />
      <div
        ref="contentRef"
        class="main-content"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
      >
        <router-view />
      </div>
    </div>
    <!-- 固定背景层，实现不滚动 + 磨砂效果 -->
    <div class="fixed-bg" :style="bgStyle" :class="{ 'bg-clear': isHovering }"></div>

    <!-- 新建/编辑计划弹窗 -->
    <PlanFormModal v-model="planModalVisible" :initial-data="editingPlan" @save="handleSavePlan" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import LayoutSidebar from '@/components/common/LayoutSidebar.vue'
import LayoutHeader from '@/components/common/LayoutHeader.vue'
import PlanFormModal from '@/components/common/PlanFormModal.vue'
import { usePlanStore } from '@/stores/planStore'
import type { Plan } from '@/types/models'

const planStore = usePlanStore()
const planModalVisible = ref(false)
const editingPlan = ref<Plan | null>(null)

const contentRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const bgStyle = reactive({
  top: '0px',
  left: '0px',
  width: '0px',
  height: '0px',
})

let resizeObserver: ResizeObserver | null = null
let rafId: number | null = null

const updateBgPosition = () => {
  if (!contentRef.value) return
  const rect = contentRef.value.getBoundingClientRect()
  bgStyle.top = `${rect.top}px`
  bgStyle.left = `${rect.left}px`
  bgStyle.width = `${rect.width}px`
  bgStyle.height = `${rect.height}px`
}

const throttledUpdate = () => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateBgPosition)
}

// 新建计划（来自顶部栏或侧边栏）
const handleOpenCreatePlan = () => {
  editingPlan.value = null
  planModalVisible.value = true
}

// 保存计划（新增）
const handleSavePlan = (planData: Omit<Plan, 'id'> | Plan) => {
  if ('id' in planData && planData.id) {
    // 编辑（通常不会在 MainLayout 发生，但保留）
    planStore.updatePlan(planData.id, planData)
    ElMessage.success('更新成功')
  } else {
    planStore.addPlan(planData)
    ElMessage.success('添加成功')
  }
  planModalVisible.value = false
}

onMounted(() => {
  updateBgPosition()
  window.addEventListener('resize', throttledUpdate)
  window.addEventListener('scroll', throttledUpdate)
  if (contentRef.value) {
    resizeObserver = new ResizeObserver(throttledUpdate)
    resizeObserver.observe(contentRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', throttledUpdate)
  window.removeEventListener('scroll', throttledUpdate)
  if (rafId) cancelAnimationFrame(rafId)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<style scoped>
/* 保持原有样式不变 */
.main-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
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
  background: transparent;
  position: relative;
  z-index: 1;
}
.fixed-bg {
  position: fixed;
  background-image: url('@/assets/images/背景图.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(4px);
  transition: filter 0.3s ease;
  pointer-events: none;
  z-index: 0;
  will-change: transform, top, left, width, height;
}
.fixed-bg.bg-clear {
  filter: blur(0.5px);
}
</style>
