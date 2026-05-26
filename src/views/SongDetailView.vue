<template>
  <div class="song-detail-view">
    <div class="detail-header">
      <button class="btn-icon" @click="goBack">
        <el-icon><ArrowLeft /></el-icon> 返回
      </button>
      <h2>所有曲目练习情况</h2>
      <div></div>
    </div>

    <div v-if="groupedSongs.length" class="songs-list">
      <div
        v-for="group in groupedSongs"
        :key="group.song"
        class="song-card"
        :class="{ 'highlight-card': group.song === highlightSong }"
      >
        <!-- 左侧信息保持不变 -->
        <div class="card-left">
          <div class="song-info">
            <h3 class="song-title">{{ group.song }}</h3>
            <span class="difficulty-badge" :class="difficultyClass(group.difficulty)">
              {{ group.difficulty }}
            </span>
          </div>
          <div class="meta-row">
            <el-icon><Clock /></el-icon>
            <div class="time-locations">
              <div v-for="(item, idx) in group.practices" :key="idx" class="time-location-item">
                {{ item.practiceTime }} · {{ item.location }}
              </div>
            </div>
          </div>
          <div class="meta-row">
            <span class="label">进度：</span>
            <div class="progress-list">
              <span
                v-for="(prog, idx) in group.progressList"
                :key="idx"
                class="progress-badge"
                :class="progressClass(prog)"
              >
                {{ prog }}
              </span>
            </div>
          </div>
          <div class="meta-row responsible">
            <span class="label">负责人：</span>
            <div class="responsible-icons">
              <img
                v-for="(name, idx) in group.responsibleList"
                :key="idx"
                :src="responsibleIconMap[name]"
                :alt="name"
                class="avatar-icon"
                :title="name"
              />
            </div>
          </div>
        </div>

        <!-- 右侧 notes 区域：每条记录增加编辑按钮 -->
        <div class="card-right">
          <div class="notes-label">练习情况</div>
          <div class="notes-content">
            <div v-for="(note, idx) in group.notesList" :key="idx" class="note-item">
              <div class="note-header">
                <span class="note-time">{{ group.practices[idx]?.practiceTime || '' }}</span>
                <el-button
                  text
                  size="small"
                  :icon="Edit"
                  @click="openNoteEdit(group, idx)"
                  class="edit-note-btn"
                />
              </div>
              <div class="note-text">{{ note || '暂无记录' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>暂无练习计划</p>
      <button class="btn-text" @click="goBack">返回</button>
    </div>

    <!-- 笔记编辑弹窗（仅修改 notes 字段） -->
    <NoteEditModal
      v-model="noteModalVisible"
      :initial-note="currentNote"
      :plan-id="currentPlanId"
      @saved="handleNoteSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Clock, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { usePlanStore } from '@/stores/planStore'
import { responsibleIconMap, getResponsibleList } from '@/utils/helpers'
import NoteEditModal from '@/components/common/NoteEditModal.vue'
import type { Plan } from '@/types/models'

const route = useRoute()
const router = useRouter()
const planStore = usePlanStore()

const highlightSong = computed(() => (route.query.highlight as string) || '')

// 按歌曲分组，合并信息
const groupedSongs = computed(() => {
  const plans = planStore.plans
  const songMap = new Map<
    string,
    {
      song: string
      difficulty: string
      practices: { practiceTime: string; location: string }[]
      notesList: string[]
      progressList: string[]
      responsibleSet: Set<string>
    }
  >()

  for (const plan of plans) {
    if (!songMap.has(plan.song)) {
      songMap.set(plan.song, {
        song: plan.song,
        difficulty: plan.difficulty,
        practices: [],
        notesList: [],
        progressList: [],
        responsibleSet: new Set(),
      })
    }
    const group = songMap.get(plan.song)!
    group.practices.push({ practiceTime: plan.practiceTime, location: plan.location })
    group.notesList.push(plan.notes || '')
    group.progressList.push(plan.progress)
    getResponsibleList(plan.responsible).forEach((r) => group.responsibleSet.add(r))
  }

  const result = Array.from(songMap.values()).map((group) => ({
    ...group,
    responsibleList: Array.from(group.responsibleSet),
    progressList: [...new Map(group.progressList.map((p, i) => [p, i])).keys()],
  }))

  if (highlightSong.value) {
    const idx = result.findIndex((g) => g.song === highlightSong.value)
    if (idx !== -1) {
      const [highlightItem] = result.splice(idx, 1)
      result.unshift(highlightItem)
    }
  }
  return result
})

onMounted(() => {
  if (planStore.plans.length === 0) {
    planStore.initPlans()
  }
  if (highlightSong.value) {
    nextTick(() => {
      const el = document.querySelector('.highlight-card')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
})

const goBack = () => {
  router.push('/plans')
}

// 笔记编辑弹窗相关
const noteModalVisible = ref(false)
const currentNote = ref('')
const currentPlanId = ref('')

const openNoteEdit = (group: any, idx: number) => {
  // 根据当前 group 和 idx 找到对应的计划 id
  const plan = planStore.plans.find(
    (p) =>
      p.song === group.song &&
      p.practiceTime === group.practices[idx].practiceTime &&
      p.location === group.practices[idx].location,
  )
  if (plan) {
    currentPlanId.value = plan.id
    currentNote.value = plan.notes || ''
    noteModalVisible.value = true
  }
}

const handleNoteSaved = (newNote: string) => {
  // 更新 store 中的 notes
  planStore.updatePlan(currentPlanId.value, { notes: newNote })
  ElMessage.success('笔记已更新')
  noteModalVisible.value = false
  // 刷新分组数据（store 是响应式的，界面会自动更新）
}

// 辅助样式函数
const difficultyClass = (difficulty: string) => {
  if (difficulty === '简单') return 'difficulty-easy'
  if (difficulty === '中等') return 'difficulty-medium'
  if (difficulty === '困难') return 'difficulty-hard'
  return ''
}
const progressClass = (progress: string) => {
  if (progress === '未开始') return 'progress-pending'
  if (progress === '进行中') return 'progress-active'
  if (progress === '已完成') return 'progress-done'
  return ''
}
</script>

<style scoped>
/* 原有样式保持不变，增加 note-header 布局 */
.song-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.2rem;
}
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}
.detail-header h2 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--text-primary, #1f3d3c);
}
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
.btn-icon {
  color: var(--text-secondary, #5a7c7a);
}
.btn-icon:hover {
  color: var(--primary-color, #2bc4ba);
  background-color: var(--primary-color-light, #e6f7f5);
}
.songs-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.song-card {
  background: var(--bg-card, #fff);
  border-radius: 1rem;
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.1));
  padding: 1.5rem;
  border: 1px solid var(--border-color, #e0f0ef);
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  transition: box-shadow 0.2s;
}
.highlight-card {
  border: 1px solid var(--primary-color, #2bc4ba);
  box-shadow: 0 0 0 1px var(--primary-color, #2bc4ba);
  scroll-margin-top: 20px;
}
.card-left {
  flex: 2;
  min-width: 200px;
}
.card-right {
  flex: 1;
  min-width: 180px;
  background-color: #f8f9fa;
  border-radius: 0.8rem;
  padding: 1rem;
}
.song-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.song-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary, #1f3d3c);
}
.difficulty-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
  font-size: 0.75rem;
}
.difficulty-easy {
  background-color: #e0f2e9;
  color: #2e7d64;
}
.difficulty-medium {
  background-color: #fff3e0;
  color: #e6a017;
}
.difficulty-hard {
  background-color: #ffe0e0;
  color: #d9534f;
}
.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}
.meta-row .label {
  font-weight: 500;
  color: var(--text-secondary, #5a7c7a);
  min-width: 3rem;
}
.time-locations {
  flex: 1;
}
.time-location-item {
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}
.progress-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.progress-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
  font-size: 0.75rem;
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
  gap: 0.3rem;
  flex-wrap: wrap;
}
.avatar-icon {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  object-fit: cover;
}
.note-item {
  margin-bottom: 0.8rem;
  border-bottom: 1px dashed var(--border-color, #e0f0ef);
  padding-bottom: 0.6rem;
}
.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
.edit-note-btn {
  padding: 0;
  margin: 0;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.edit-note-btn:hover {
  opacity: 1;
}
.note-time {
  font-size: 0.7rem;
  color: var(--text-secondary, #5a7c7a);
}
.note-text {
  font-size: 0.85rem;
  line-height: 1.4;
  word-break: break-word;
}
.empty-state {
  text-align: center;
  padding: 3rem;
  background: var(--bg-surface, #fff);
  border-radius: 1rem;
}
@media (max-width: 700px) {
  .song-card {
    flex-direction: column;
  }
  .detail-header h2 {
    font-size: 1.2rem;
  }
}
</style>
