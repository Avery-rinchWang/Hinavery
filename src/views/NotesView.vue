<template>
  <div class="notes-view">
    <div class="page-header">
      <h1>碎碎念 · Hina的日记</h1>
      <button class="btn-primary-outline" @click="openCreateDialog">
        <el-icon><Plus /></el-icon> 写日记
      </button>
    </div>

    <div v-if="notes.length" class="notes-list">
      <div v-for="note in notes" :key="note.id" class="note-card">
        <div class="note-header">
          <h3 class="note-title">{{ note.title }}</h3>
          <div class="note-actions">
            <el-button text :icon="Edit" @click="editNote(note)" />
            <el-button text :icon="Delete" type="danger" @click="confirmDelete(note.id)" />
          </div>
        </div>
        <div class="note-date">{{ formatDate(note.createdAt) }}</div>
        <div class="note-content">{{ note.content }}</div>
      </div>
    </div>
    <el-empty v-else description="还没有日记，写一篇吧～" />

    <!-- 新增/编辑弹窗 -->
    <BaseModal v-model="dialogVisible" :title="isEdit ? '编辑日记' : '写日记'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题" required>
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input type="textarea" v-model="form.content" rows="6" />
        </el-form-item>
      </el-form>
      <template #footer>
        <button class="modal-btn modal-btn-default" @click="dialogVisible = false">取消</button>
        <button class="modal-btn modal-btn-primary" @click="handleSave">保存</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useNoteStore } from '@/stores/noteStore'
import BaseModal from '@/components/common/BaseModal.vue'

const noteStore = useNoteStore()
const notes = computed(() => noteStore.notes)

onMounted(() => {
  if (noteStore.notes.length === 0) {
    noteStore.initNotes()
  }
})

// 弹窗状态
const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref('')
const form = ref({ title: '', content: '' })

const openCreateDialog = () => {
  isEdit.value = false
  form.value = { title: '', content: '' }
  dialogVisible.value = true
}

const editNote = (note: any) => {
  isEdit.value = true
  editId.value = note.id
  form.value = { title: note.title, content: note.content }
  dialogVisible.value = true
}

const handleSave = () => {
  if (!form.value.title.trim() || !form.value.content.trim()) {
    ElMessage.warning('请填写完整')
    return
  }
  if (isEdit.value) {
    noteStore.updateNote(editId.value, form.value)
    ElMessage.success('更新成功')
  } else {
    noteStore.addNote(form.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
}

const confirmDelete = async (id: string) => {
  await ElMessageBox.confirm('确定删除这篇日记吗？', '提示', { type: 'warning' })
  noteStore.deleteNote(id)
  ElMessage.success('删除成功')
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}
</script>

<style scoped>
.notes-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.2rem;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #206f6d;
}
.btn-primary-outline {
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
.btn-primary-outline:hover {
  background-color: var(--primary-color, #2bc4ba);
  color: white;
}
.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.note-card {
  background: var(--bg-card, #fff);
  border-radius: 1rem;
  padding: 1.2rem;
  border: 1px solid var(--border-color, #e0f0ef);
  box-shadow: var(--shadow-sm);
}
.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.note-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.note-date {
  font-size: 0.75rem;
  color: var(--text-secondary, #5a7c7a);
  margin-bottom: 0.75rem;
}
.note-content {
  white-space: pre-wrap;
  line-height: 1.5;
  color: var(--text-primary, #1f3d3c);
}

/* 弹窗内按钮样式 */
.modal-btn {
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: transparent;
}
.modal-btn-default {
  border: 1px solid var(--border-color, #e0f0ef);
  color: var(--text-secondary, #5a7c7a);
}
.modal-btn-default:hover {
  border-color: var(--primary-color, #2bc4ba);
  color: var(--primary-color, #2bc4ba);
}
.modal-btn-primary {
  background-color: var(--primary-color, #2bc4ba);
  color: white;
}
.modal-btn-primary:hover {
  background-color: var(--primary-dark, #1a9e95);
}
</style>
