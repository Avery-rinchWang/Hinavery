<!-- src/views/MainLayout.vue -->
<template>
  <div class="main-layout">
    <header class="temp-header">
      <div class="logo">Hina 练习管理系统</div>
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f5f7fa;
}

.temp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.logo {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3996ed;
}

.logout-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #e05555;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
</style>
