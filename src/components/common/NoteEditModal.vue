<template>
  <BaseModal v-model="visible" title="编辑练习笔记" width="500px" @close="handleClose">
    <el-form :model="form" label-width="80px">
      <el-form-item label="笔记内容">
        <el-input
          type="textarea"
          v-model="form.notes"
          rows="6"
          placeholder="记录本次练习的心得、问题等..."
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <button class="modal-btn modal-btn-default" @click="visible = false">取消</button>
      <button class="modal-btn modal-btn-primary" @click="handleSave">保存</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'

const props = defineProps<{
  modelValue: boolean
  initialNote: string
  planId: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'saved', newNote: string): void
}>()

const visible = ref(false)
const form = ref({ notes: '' })

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val
    if (val) {
      form.value.notes = props.initialNote
    }
  },
)

const handleClose = () => {
  emit('update:modelValue', false)
}

const handleSave = () => {
  emit('saved', form.value.notes)
  handleClose()
}
</script>

<style scoped>
/* 自定义按钮样式 */
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
