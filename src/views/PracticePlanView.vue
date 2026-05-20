<template>
  <div class="practice-plan-view">
    <div class="page-header">
      <h1>练习计划</h1>
      <!-- 删除新建计划按钮 -->
    </div>

    <PlanGroup
      v-if="groupList.length"
      :groups="groupList"
      @view-detail="handleViewDetail"
      @edit="handleEditPlan"
    />
    <el-empty v-else description="暂无练习计划" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { usePlanStore } from '@/stores/planStore'
import PlanGroup from '@/components/practice/PlanGroup.vue'

const router = useRouter()
const planStore = usePlanStore()

onMounted(() => {
  if (planStore.plans.length === 0) {
    planStore.initPlans()
  }
})

const groupList = computed(() => planStore.groupedPlans)

const handleViewDetail = (planId: string) => {
  router.push(`/songs/${planId}`)
}

const handleEditPlan = (planId: string) => {
  ElMessage.info(`编辑计划 ID: ${planId}`)
}
</script>

<style scoped>
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
}
.page-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #206f6d;
}
</style>
