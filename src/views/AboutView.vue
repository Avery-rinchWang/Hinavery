<template>
  <div class="about-view">
    <div class="about-card">
      <h1>关于本项目</h1>
      <div class="about-content">
        <p>
          <strong>Hina 练习管理系统</strong> 是一个前端 CRUD
          练习项目，用于管理音乐练习计划、曲目、日记和照片。
        </p>

        <h3>技术栈</h3>
        <ul>
          <li>Vue 3 + TypeScript</li>
          <li>Pinia 状态管理</li>
          <li>Vue Router 路由</li>
          <li>Element Plus UI 组件库</li>
          <li>Vite 构建工具</li>
          <li>LocalStorage 数据持久化</li>
        </ul>

        <h3>主要功能</h3>
        <ul>
          <li>登录/注册（模拟）</li>
          <li>练习计划管理（按时间/地点分组）</li>
          <li>曲目详情（按歌曲汇总练习记录）</li>
          <li>碎碎念（日记增删改查）</li>
          <li>相册（图片上传/删除/预览）</li>
          <li>账号信息（修改密码模拟）</li>
        </ul>

        <p class="footer-note">开发练习作品 · 仅前端模拟实现</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
.about-card {
  background: var(--bg-surface, #fff);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid var(--border-color, #e0f0ef);
  box-shadow: var(--shadow-md);
}
h1 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  color: #206f6d;
  text-align: center;
}
.about-content h3 {
  margin: 1.2rem 0 0.5rem 0;
  color: var(--primary-color, #2bc4ba);
  font-size: 1.2rem;
}
.about-content p {
  line-height: 1.6;
  color: var(--text-primary, #1f3d3c);
}
ul {
  margin: 0.5rem 0 0 1.5rem;
  color: var(--text-primary, #1f3d3c);
  line-height: 1.6;
}
li {
  margin: 0.25rem 0;
}
.footer-note {
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  border-top: 1px dashed var(--border-color, #e0f0ef);
  font-size: 0.85rem;
  color: var(--text-secondary, #5a7c7a);
}
</style>
