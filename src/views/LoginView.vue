<!-- src/views/LoginView.vue -->
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="image-section">
        <img :src="Img" alt="hinaaaaaaaa" />
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

  <!-- 新增装饰 -->
  <div class="star-curtain">
    <div
      v-for="item in stars"
      :key="item.id"
      class="star-item"
      :style="{
        '--float-duration': item.duration + 's',
        '--float-delay': item.delay + 's',
      }"
    >
      <div class="dashed-line" :style="{ height: item.height + 'px' }"></div>
      <span class="star" :style="{ animationDelay: item.twinkleDelay + 's' }">☆</span>
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

// 生成 10 条悬挂星的数据
const stars = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  height: Math.floor(Math.random() * (210 - 70 + 1) + 70), // 70~210px 随机高度
  duration: (Math.random() * 1.8 + 2.0).toFixed(2), // 2.0~3.8s 浮动时长
  delay: (Math.random() * 1.6 - 0.6).toFixed(2), // -0.6~1.0s 延迟
  twinkleDelay: (Math.random() * 2.5).toFixed(2), // 星星闪烁延迟
}))
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
  transition: transform 0.3s ease;
}

/* 配图动效：悬浮时上下浮动 + 轻微缩放 */
.image-section img {
  transition: transform 0.3s ease;
}

.image-section img:hover {
  animation: float 2s ease-in-out infinite;
  transform: scale(1.02);
}

@keyframes float {
  0% {
    transform: translateY(0px) scale(1.02);
  }
  50% {
    transform: translateY(-8px) scale(1.05);
  }
  100% {
    transform: translateY(0px) scale(1.02);
  }
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
  background: rgb(247, 254, 255);
  padding: 1.8rem; /* 减小内边距，更紧凑 */
  border-radius: 0.8rem;
  box-shadow: 0 0.6rem 2.5rem rgba(86, 88, 96, 0.353);
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
  background-color: #77c7f8;
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
  background-color: #5f9ae7;
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

/* ----- 悬挂星群容器 (固定在视口顶部) ----- */
.star-curtain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: nowrap;
  z-index: 10;
  pointer-events: none; /* 不干扰登录卡片交互 */
  background: transparent;
  padding: 0 12px;
}

/* 单个悬挂单元：虚线 + 星星, 垂直排列 */
.star-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform-origin: center top;
  will-change: transform;

  /* 改用 CSS 变量控制动画 */
  animation: floatDrift var(--float-duration, 3s) ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}

/* 垂下的虚线 — 蓝绿色、空心风格 */
.dashed-line {
  width: 0;
  border-left: 2px dashed #65d7d9;
  transition: height 0.2s ease;
  filter: drop-shadow(0 0 1px rgba(43, 196, 186, 0.3));
}

/* 空心五角星 ☆ 字符风格 */
.star {
  font-size: 2.4rem;
  line-height: 1;
  margin-top: -6px;
  display: inline-block;
  color: #48dcd2;
  text-shadow: 0 0 3px rgba(70, 216, 206, 0.4);
  transition: all 0.2s;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
  animation: starTwinkle 3s infinite alternate;
}

/* 上下浮动关键帧 */
@keyframes floatDrift {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-7px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* 星星微光呼吸 */
@keyframes starTwinkle {
  0% {
    opacity: 0.85;
    text-shadow: 0 0 0px #2bc4ba;
  }
  100% {
    opacity: 1;
    text-shadow:
      0 0 6px #7fe7e0,
      0 0 2px #2bc4ba;
  }
}

/* 响应式调整星星大小 */
@media (max-width: 700px) {
  .star {
    font-size: 1.8rem;
  }
  .star-curtain {
    padding: 0 8px;
  }
}

@media (max-width: 550px) {
  .star {
    font-size: 1.5rem;
  }
  .dashed-line {
    border-left-width: 1.5px;
  }
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
