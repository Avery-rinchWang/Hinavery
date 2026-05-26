<template>
  <div class="account-view">
    <div class="page-header">
      <h1>账号信息</h1>
    </div>

    <div class="account-card">
      <!-- 用户名展示 -->
      <div class="info-row">
        <span class="label">用户名：</span>
        <span class="value">{{ username }}</span>
      </div>

      <!-- 修改密码表单 -->
      <div class="password-section">
        <h3>修改密码</h3>
        <el-form :model="form" label-width="100px" @submit.prevent="handleChangePassword">
          <el-form-item label="原密码" required>
            <el-input
              type="password"
              v-model="form.oldPassword"
              placeholder="请输入原密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="新密码" required>
            <el-input
              type="password"
              v-model="form.newPassword"
              placeholder="请输入新密码（至少6位）"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认新密码" required>
            <el-input
              type="password"
              v-model="form.confirmPassword"
              placeholder="请再次输入新密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleChangePassword">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 提示信息（可选） -->
      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const username = ref('')

onMounted(() => {
  userStore.initUser()
  username.value = userStore.username
})

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const message = ref('')
const messageType = ref('') // 'success' or 'error'

const handleChangePassword = () => {
  // 简单前端验证（模拟固定原密码为 "123456"）
  const { oldPassword, newPassword, confirmPassword } = form.value

  if (!oldPassword || !newPassword || !confirmPassword) {
    ElMessage.warning('请填写完整')
    return
  }
  if (oldPassword !== '123456') {
    ElMessage.error('原密码错误')
    return
  }
  if (newPassword.length < 6) {
    ElMessage.error('新密码长度至少为6位')
    return
  }
  if (newPassword !== confirmPassword) {
    ElMessage.error('两次输入的新密码不一致')
    return
  }

  // 模拟修改成功（实际应请求后端）
  ElMessage.success('密码修改成功！')
  // 清空表单
  form.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
}
</script>

<style scoped>
.account-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.2rem;
}
.page-header {
  margin-bottom: 1.5rem;
}
.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #206f6d;
}
.account-card {
  background: var(--bg-surface, #fff);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid var(--border-color, #e0f0ef);
  box-shadow: var(--shadow-md);
}
.info-row {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--border-color, #e0f0ef);
}
.label {
  font-weight: 600;
  color: var(--text-secondary, #5a7c7a);
  width: 100px;
  display: inline-block;
}
.value {
  color: var(--text-primary, #1f3d3c);
  font-weight: 500;
}
.password-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: var(--primary-color, #2bc4ba);
}
:deep(.el-form-item__label) {
  color: var(--text-secondary, #5a7c7a);
}
:deep(.el-input__wrapper.is-focus),
:deep(.el-textarea__inner:focus) {
  border-color: var(--primary-color, #2bc4ba);
  box-shadow: 0 0 0 2px rgba(43, 196, 186, 0.2);
}
.el-button--primary {
  background-color: var(--primary-color, #2bc4ba);
  border-color: var(--primary-color, #2bc4ba);
}
.el-button--primary:hover {
  background-color: var(--primary-dark, #1a9e95);
  border-color: var(--primary-dark, #1a9e95);
}
.message {
  margin-top: 1.5rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 6px;
}
.message.success {
  background-color: #e0f2e9;
  color: #2e7d64;
}
.message.error {
  background-color: #ffe0e0;
  color: #d9534f;
}
</style>
