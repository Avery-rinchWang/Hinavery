<template>
  <el-collapse v-model="activeNames" class="plan-group">
    <el-collapse-item
      v-for="group in groups"
      :key="`${group.dateStr}_${group.timeRange}_${group.location}`"
      :name="`${group.dateStr}_${group.timeRange}_${group.location}`"
    >
      <template #title>
        <div class="group-title">
          <span class="date-location">
            {{ formatGroupTitleWithTime(group.dateStr, group.timeRange, group.location) }}
          </span>
          <span class="plan-count">{{ group.plans.length }}个计划</span>
        </div>
      </template>
      <div class="cards-grid">
        <PlanSummaryCard
          v-for="plan in group.plans"
          :key="plan.id"
          :plan="plan"
          @view-detail="() => emit('viewDetail', plan.id)"
          @edit="() => emit('edit', plan.id)"
        />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlanSummaryCard from './PlanSummaryCard.vue'
import { formatGroupTitleWithTime } from '@/utils/helpers'
import type { Plan } from '@/types/models'

const props = defineProps<{
  groups: { dateStr: string; timeRange: string; location: string; plans: Plan[] }[]
}>()
const emit = defineEmits<{
  (e: 'viewDetail', planId: string): void
  (e: 'edit', planId: string): void
}>()

const activeNames = ref(props.groups.map((g) => `${g.dateStr}_${g.timeRange}_${g.location}`))
</script>

<style scoped>
.plan-group {
  background: transparent;
  border: none;
}
/* 每个分类面板之间间距 1.5rem */
:deep(.el-collapse-item) {
  margin-bottom: 1.5rem;
}
:deep(.el-collapse-item__header) {
  background: var(--bg-card, #fff);
  border-radius: 0.8rem;
  margin-bottom: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color, #e0f0ef);
  height: auto;
  line-height: 1.4;
}
:deep(.el-collapse-item__wrap) {
  background: transparent;
  border: none;
}
:deep(.el-collapse-item__content) {
  padding: 0.5rem 0 1rem 0;
}
.group-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 500;
  color: var(--text-primary, #1f3d3c);
}
.date-location {
  font-size: 1rem;
}
.plan-count {
  font-size: 0.75rem;
  color: var(--text-secondary, #5a7c7a);
  background: var(--primary-color-light, #e6f7f5);
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
}
.cards-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

/* 响应式：窗口宽度 < 900px 改为每排2个 */
@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* 窗口宽度 < 820px 改为每排1个 */
@media (max-width: 820px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
