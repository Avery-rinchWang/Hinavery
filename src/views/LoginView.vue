<!-- src/views/LoginView.vue -->
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="image-section">
        <img :src="Img" alt="hinaaaaaaaa" title="很喜欢的一张照片噜~" />
      </div>

      <div class="login-card">
        <div class="card-header">
          <h1>{{ isLoginMode ? '登录噜噜噜' : '新来的！' }}</h1>
          <p>
            <a href="#" class="link" @click.prevent="toggleMode">
              {{ isLoginMode ? '创建账号' : '已有账号？去登录' }}
            </a>
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">用户名</label>
            <input id="username" type="text" placeholder="Username" v-model="form.username" />
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="password">密码</label>
              <a href="#" class="link" v-if="isLoginMode">忘记密码？</a>
            </div>
            <input id="password" type="password" placeholder="Password" v-model="form.password" />
          </div>

          <div class="form-group" v-if="!isLoginMode">
            <label for="confirmPassword">确认密码</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              v-model="form.confirmPassword"
            />
          </div>

          <button type="submit" class="btn-primary">
            {{ isLoginMode ? '登录' : '注册' }}
          </button>
        </form>
        <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const Img = new URL('@/assets/images/card_after_training (1).png', import.meta.url).href

const router = useRouter()
const isLoginMode = ref(true)
const errorMsg = ref('')

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  errorMsg.value = ''
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
}

const handleSubmit = () => {
  if (!form.username.trim() || !form.password.trim()) {
    errorMsg.value = '请填写用户名和密码'
    return
  }

  if (!isLoginMode.value && form.password !== form.confirmPassword) {
    errorMsg.value = '两次输入的密码不一致'
    return
  }

  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('username', form.username)
  router.push('/plans')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.login-page {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #cffffe, #ebf1f7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem; /* 与视口边缘保持间距 */
}

.login-container {
  position: relative;
  width: 80vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.image-section {
  width: 70%;
  max-height: 90%;
  margin-left: 30%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-section img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.login-card {
  position: absolute;
  width: 40%;
  min-width: 220px;
  max-width: 400px;
  max-height: 85vh; /* 降低最大高度，避免滚动条 */
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: white;
  padding: 1.8rem; /* 减小内边距，更紧凑 */
  border-radius: 0.8rem;
  box-shadow: 0 0.6rem 2.5rem rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.login-card::-webkit-scrollbar {
  width: 0.3rem;
}

.login-card::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 0.6rem;
}

.login-card::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 0.6rem;
}

.card-header h1 {
  color: #25384e;
  margin-bottom: 0.6rem;
  font-size: 1.8rem;
  white-space: nowrap;
}

.card-header p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.link {
  color: #3996ed;
  text-decoration: none;
  font-size: 0.85rem;
  white-space: nowrap;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.form-group {
  margin-bottom: 1rem; /* 减小表单项间距 */
}

label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem;
}

input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s;
}

input:focus {
  border-color: #3996ed;
  box-shadow: 0 0 0 3px rgba(57, 150, 237, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 0.7rem;
  background-color: #6397f1;
  color: white;
  border: none;
  border-radius: 0.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #4a82e0;
}

.btn-primary:active {
  background-color: #3a6fc4;
}

.error-msg {
  color: #e34d4d;
  font-size: 0.85rem;
  margin-top: 0.6rem;
  text-align: center;
}

@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }

  .login-container {
    width: 95vw;
    height: auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1.5rem;
  }

  .image-section {
    width: 90%;
    max-height: 40vh;
    margin-left: 0;
    order: 2;
  }

  .login-card {
    position: static;
    width: 85%;
    max-width: 380px;
    max-height: none;
    transform: none;
    margin: 0 auto;
    padding: 1.5rem;
    order: 1;
  }
}
</style>
