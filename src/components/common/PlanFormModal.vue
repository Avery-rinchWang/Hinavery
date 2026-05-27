<template>
  <BaseModal
    v-model="visible"
    :title="isEdit ? '编辑计划' : '新建计划'"
    width="550px"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
      <el-form-item label="歌曲名称" prop="song">
        <el-input v-model="form.song" placeholder="请输入歌曲名称" />
      </el-form-item>

      <el-form-item label="难度" prop="difficulty">
        <el-select v-model="form.difficulty" placeholder="请选择难度">
          <el-option label="简单" value="简单" />
          <el-option label="中等" value="中等" />
          <el-option label="困难" value="困难" />
        </el-select>
      </el-form-item>

      <el-form-item label="练习时间" prop="practiceTime">
        <el-input v-model="form.practiceTime" placeholder="格式：2026-05-20 13:00-17:00" />
      </el-form-item>

      <el-form-item label="地点" prop="location">
        <el-input v-model="form.location" placeholder="请输入练习地点" />
      </el-form-item>

      <el-form-item label="进度" prop="progress">
        <el-select v-model="form.progress" placeholder="请选择进度">
          <el-option label="未开始" value="未开始" />
          <el-option label="进行中" value="进行中" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-form-item>

      <el-form-item label="负责人" prop="responsibleList">
        <div class="responsible-check-group">
          <el-checkbox-group v-model="form.responsibleList">
            <el-checkbox
              v-for="name in responsibleNames"
              :key="name"
              :value="name"
              class="responsible-checkbox"
            >
              <img :src="responsibleIconMap[name]" :alt="name" class="checkbox-icon" />
              <span class="checkbox-label"></span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>

      <el-form-item label="练习情况" prop="notes">
        <el-input
          type="textarea"
          v-model="form.notes"
          rows="3"
          placeholder="可选，记录本次练习的心得、问题等"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <button class="modal-btn modal-btn-default" @click="handleClose">取消</button>
      <button class="modal-btn modal-btn-primary" @click="handleSubmit">保存</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import BaseModal from '@/components/common/BaseModal.vue'
import { responsibleIconMap } from '@/utils/helpers'
import type { Plan } from '@/types/models'

const props = defineProps<{
  modelValue: boolean
  initialData?: Plan | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', data: Omit<Plan, 'id'> | Plan): void
}>()

const visible = ref(false)
const formRef = ref<FormInstance>()

const isEdit = computed(() => !!props.initialData?.id)

// 可选负责人列表
const responsibleNames = ['hina', 'cst', 'aya', 'eve', 'maya']

// 表单数据
const form = ref({
  song: '',
  difficulty: '中等' as '简单' | '中等' | '困难',
  practiceTime: '',
  location: '',
  progress: '未开始' as '未开始' | '进行中' | '已完成',
  responsibleList: [] as string[],
  notes: '',
})

// 表单校验规则
const rules: FormRules = {
  song: [{ required: true, message: '请输入歌曲名称', trigger: 'blur' }],
  difficulty: [{ required: true, message: '请选择难度', trigger: 'change' }],
  practiceTime: [{ required: true, message: '请输入练习时间', trigger: 'blur' }],
  location: [{ required: true, message: '请输入地点', trigger: 'blur' }],
  progress: [{ required: true, message: '请选择进度', trigger: 'change' }],
  responsibleList: [
    { type: 'array', required: true, message: '请至少选择一位负责人', trigger: 'change' },
  ],
}

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val
    if (val && props.initialData) {
      // 编辑模式：填充数据
      form.value = {
        song: props.initialData.song,
        difficulty: props.initialData.difficulty,
        practiceTime: props.initialData.practiceTime,
        location: props.initialData.location,
        progress: props.initialData.progress,
        responsibleList: props.initialData.responsible
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        notes: props.initialData.notes || '',
      }
    } else if (val && !props.initialData) {
      // 新建模式：重置表单
      form.value = {
        song: '',
        difficulty: '中等',
        practiceTime: '',
        location: '',
        progress: '未开始',
        responsibleList: [],
        notes: '',
      }
    }
  },
  { immediate: true },
)

const handleClose = () => {
  emit('update:modelValue', false)
  formRef.value?.resetFields()
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      const responsibleStr = form.value.responsibleList.join(',')
      const submitData = {
        song: form.value.song,
        difficulty: form.value.difficulty,
        practiceTime: form.value.practiceTime,
        location: form.value.location,
        progress: form.value.progress,
        responsible: responsibleStr,
        notes: form.value.notes,
      }
      if (isEdit.value && props.initialData) {
        // 编辑模式：带上 id
        emit('save', { ...submitData, id: props.initialData.id } as Plan)
      } else {
        // 新建模式：不含 id
        emit('save', submitData as Omit<Plan, 'id'>)
      }
      handleClose()
    } else {
      ElMessage.warning('请填写完整信息')
    }
  })
}
</script>

<style scoped>
/* 自定义按钮样式（与 NoteEditModal 保持一致） */
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

/* 负责人复选框组样式 */
.responsible-check-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.responsible-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: 0;
}
.checkbox-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
.checkbox-label {
  font-size: 0.9rem;
  color: var(--text-primary, #1f3d3c);
}
:deep(.el-checkbox__label) {
  padding-left: 4px;
}
:deep(.el-form-item__label) {
  color: var(--text-secondary, #5a7c7a);
  font-weight: 500;
}
:deep(.el-input__wrapper.is-focus),
:deep(.el-textarea__inner:focus),
:deep(.el-select .el-input__wrapper.is-focus) {
  border-color: var(--primary-color, #2bc4ba);
  box-shadow: 0 0 0 2px rgba(43, 196, 186, 0.2);
}
</style>
