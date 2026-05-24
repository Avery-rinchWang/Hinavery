<template>
  <div class="plan-card">
    <h3 class="song-title">{{ plan.song }}</h3>
    <div class="card-info">
      <div class="progress-badge" :class="progressClass">
        {{ plan.progress }}
      </div>
      <div class="responsible-icons">
        <img
          v-for="(name, idx) in responsibleList"
          :key="idx"
          :src="responsibleIconMap[name]"
          :alt="name"
          class="avatar-icon"
        />
      </div>
    </div>
    <div class="card-actions">
      <button class="btn-text" @click="emit('viewDetail', plan.song)">查看详情</button>
      <button class="btn-primary-outline" @click="emit('edit')">编辑</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Plan } from '@/types/models'
import { responsibleIconMap, getResponsibleList } from '@/utils/helpers'

const props = defineProps<{ plan: Plan }>()
const emit = defineEmits<{
  (e: 'viewDetail', songName: string): void
  (e: 'edit'): void
}>()

const responsibleList = computed(() => getResponsibleList(props.plan.responsible))

const progressClass = computed(() => {
  switch (props.plan.progress) {
    case '未开始':
      return 'progress-pending'
    case '进行中':
      return 'progress-active'
    case '已完成':
      return 'progress-done'
    default:
      return ''
  }
})
</script>

<style scoped>
.plan-card {
  background: var(--bg-card, #fff);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.05));
  padding: 1rem;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color, #e0f0ef);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.plan-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.1));
}
.song-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary, #1f3d3c);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.progress-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
  background-color: #f0f2f5;
  color: #5a6874;
}
.progress-pending {
  background-color: #fff3e0;
  color: #e6a017;
}
.progress-active {
  background-color: #e0f7fa;
  color: #00838f;
}
.progress-done {
  background-color: #e0f2e9;
  color: #2e7d64;
}
.responsible-icons {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.avatar-icon {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  object-fit: cover;
}
.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
/* 按钮样式：与顶部栏一致，适当缩小内边距 */
button {
  font-family: inherit;
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.btn-text {
  color: var(--text-secondary, #5a7c7a);
}
.btn-text:hover {
  color: var(--primary-color, #2bc4ba);
  background-color: #ffffff;
}
.btn-primary-outline {
  background-color: transparent;
  border: 1px solid var(--primary-color, #2bc4ba);
  color: var(--primary-color, #2bc4ba);
}
.btn-primary-outline:hover {
  background-color: var(--primary-color, #2bc4ba);
  color: white;
}
</style>
