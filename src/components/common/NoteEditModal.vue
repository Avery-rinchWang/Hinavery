<template>
  <el-dialog
    title="编辑练习笔记"
    v-model="visible"
    width="500px"
    class="note-edit-dialog"
    @close="handleClose"
  >
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
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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
  // 关闭弹窗由父组件在 saved 后处理，但为了用户体验，可先关闭
  handleClose()
}
</script>

<style scoped>
/* 无需额外样式 */
</style>
