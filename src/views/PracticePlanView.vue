<template>
  <div class="practice-plan-view">
    <div class="page-header">
      <h1>练习计划</h1>
      <div class="toolbar">
        <button class="btn-icon-text" @click="toggleCollapse">
          <el-icon><Fold v-if="!isCollapsed" /><Expand v-else /></el-icon>
          <span>{{ isCollapsed ? '展开分组' : '折叠分组' }}</span>
        </button>
        <button class="btn-primary-outline btn-sm" @click="showAllPlans">
          <el-icon><Refresh /></el-icon>
          <span>全部计划</span>
        </button>
      </div>
    </div>

    <!-- 时间/地点卡片区域：根据折叠状态和是否选中决定显示内容 -->
    <div class="group-cards" v-if="!isCollapsed || (isCollapsed && activeGroupKey)">
      <!-- 折叠状态：只显示选中的分组卡片 -->
      <div v-if="isCollapsed && activeGroupKey" class="cards-single">
        <div class="group-card active" @click="selectGroup(activeGroupKey)">
          <div class="group-card-title">{{ getGroupTitleByKey(activeGroupKey) }}</div>
          <div class="group-card-count">{{ getGroupPlansCount(activeGroupKey) }}个计划</div>
        </div>
      </div>
      <!-- 展开状态：显示所有分组卡片 -->
      <div v-else class="cards-scroll">
        <div
          v-for="group in groupList"
          :key="group.key"
          class="group-card"
          :class="{ active: activeGroupKey === group.key }"
          @click="selectGroup(group.key)"
        >
          <div class="group-card-title">{{ formatGroupTitle(group) }}</div>
          <div class="group-card-count">{{ group.plans.length }}个计划</div>
        </div>
      </div>
    </div>

    <!-- 当前展示的计划卡片网格 -->
    <div class="plans-section" v-if="displayPlans.length">
      <div class="cards-grid">
        <PlanSummaryCard
          v-for="plan in displayPlans"
          :key="plan.id"
          :plan="plan"
          @view-detail="handleViewDetail"
          @edit="handleEditPlan"
        />
      </div>
    </div>
    <el-empty v-else description="暂无练习计划" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Fold, Expand, Refresh } from '@element-plus/icons-vue'
import { usePlanStore } from '@/stores/planStore'
import PlanSummaryCard from '@/components/practice/PlanSummaryCard.vue'
import { formatGroupTitleWithTime } from '@/utils/helpers'

const router = useRouter()
const planStore = usePlanStore()

onMounted(() => {
  if (planStore.plans.length === 0) {
    planStore.initPlans()
  }
})

const groupList = computed(() => planStore.groupedPlans)

const isCollapsed = ref(false) // 分组卡片区域是否折叠
const activeGroupKey = ref<string | null>(null) // 当前选中的分组key，null表示全部

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const showAllPlans = () => {
  activeGroupKey.value = null
  // 全部计划时自动展开分组卡片区域，方便用户重新选择
  if (isCollapsed.value) {
    isCollapsed.value = false
  }
}

const selectGroup = (key: string) => {
  activeGroupKey.value = key
}

const displayPlans = computed(() => {
  if (activeGroupKey.value === null) {
    return planStore.plans
  }
  const activeGroup = groupList.value.find((g) => g.key === activeGroupKey.value)
  return activeGroup ? activeGroup.plans : []
})

const formatGroupTitle = (group: { dateStr: string; timeRange: string; location: string }) => {
  return formatGroupTitleWithTime(group.dateStr, group.timeRange, group.location)
}

// 根据key获取分组标题和计划数量（用于折叠时显示单个卡片）
const getGroupTitleByKey = (key: string) => {
  const group = groupList.value.find((g) => g.key === key)
  return group ? formatGroupTitle(group) : ''
}
const getGroupPlansCount = (key: string) => {
  const group = groupList.value.find((g) => g.key === key)
  return group ? group.plans.length : 0
}
</script>

<style scoped>
/* 样式与之前相同，仅增加 .cards-single 用于折叠时单个卡片居中 */
.practice-plan-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.2rem;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.page-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #206f6d;
}
.toolbar {
  display: flex;
  gap: 1rem;
}
.btn-icon-text {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  font-size: 0.9rem;
  color: var(--text-secondary, #5a7c7a);
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.2s;
}
.btn-icon-text:hover {
  background-color: var(--primary-color-light, #e6f7f5);
  color: var(--primary-color, #2bc4ba);
}
.btn-primary-outline.btn-sm {
  background-color: transparent;
  border: 1px solid var(--primary-color, #2bc4ba);
  color: var(--primary-color, #2bc4ba);
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary-outline.btn-sm:hover {
  background-color: var(--primary-color, #2bc4ba);
  color: white;
}
.group-cards {
  margin-bottom: 2rem;
}
.cards-single {
  display: flex;
  justify-content: center;
}
.cards-scroll {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.group-card {
  background: var(--bg-surface, #fff);
  border-radius: 0.8rem;
  padding: 1rem;
  border: 1px solid var(--border-color, #e0f0ef);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  max-width: 280px;
  margin: 0 auto;
}
.group-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.1));
}
.group-card.active {
  border-color: var(--primary-color, #2bc4ba);
  background-color: var(--primary-color-light, #e6f7f5);
}
.group-card-title {
  font-weight: 600;
  color: var(--text-primary, #1f3d3c);
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}
.group-card-count {
  font-size: 0.75rem;
  color: var(--text-secondary, #5a7c7a);
}
.cards-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 820px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
