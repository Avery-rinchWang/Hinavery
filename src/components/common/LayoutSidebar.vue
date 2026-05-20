<!-- 侧边栏 -->
<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header">
      <div class="logo-icons" v-if="!isCollapsed">
        <img v-for="(icon, idx) in iconList" :key="idx" :src="icon" :alt="`pin${idx + 1}`" />
      </div>
      <div class="toggle-btn" @click="toggleCollapse">
        <el-icon>
          <DArrowLeft v-if="!isCollapsed" />
          <DArrowRight v-else />
        </el-icon>
      </div>
    </div>

    <ul class="menu-list">
      <!-- 新建计划（无路由，不参与 active 高亮） -->
      <li class="menu-item" @click="emit('openCreatePlan')">
        <el-icon><Plus /></el-icon>
        <span class="menu-text">新建计划</span>
      </li>

      <!-- 路由菜单项：使用 v-for 动态渲染，绑定 active 类 -->
      <li
        v-for="item in menuItems"
        :key="item.path"
        class="menu-item"
        :class="{ active: isActive(item.path) }"
        @click="handleNavigate(item.path)"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span class="menu-text">{{ item.label }}</span>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Plus,
  List,
  Document,
  Edit,
  Picture,
  DArrowLeft,
  DArrowRight,
} from '@element-plus/icons-vue'
import icon1 from '@/assets/images/deco_pins017001.png'
import icon2 from '@/assets/images/deco_pins018001.png'
import icon3 from '@/assets/images/deco_pins016001.png'
import icon4 from '@/assets/images/deco_pins020001.png'
import icon5 from '@/assets/images/deco_pins019001.png'
const iconList = [icon1, icon2, icon3, icon4, icon5]

const emit = defineEmits<{
  (e: 'openCreatePlan'): void
}>()

const router = useRouter()
const route = useRoute()
const isCollapsed = ref(false)

// 菜单配置：路径、图标、显示文字
const menuItems = [
  { path: '/plans', label: '练习计划', icon: List },
  { path: '/songs', label: '曲目详情', icon: Document },
  { path: '/notes', label: '碎碎念', icon: Edit },
  { path: '/album', label: '相册', icon: Picture },
]

// 判断当前路由是否匹配
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleNavigate = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.sidebar {
  height: 100%;
  background-color: var(--bg-surface);
  box-shadow: var(--shadow-sm);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  /* 添加右侧边界线，连接整个侧边栏 */
  border-right: 1px solid var(--border-color);
  /* 展开宽度：最小200px，默认18vw，最大260px */
  width: clamp(200px, 18vw, 260px);
}

.sidebar.collapsed {
  /* 折叠宽度：最小60px，默认5vw，最大80px */
  width: clamp(60px, 5vw, 80px);
}

/* 头部区域 */
.sidebar-header {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  /* 保证内部内容不溢出 */
  overflow: hidden;
}

/* 图标组：水平排列，不换行，间距8px */
.logo-icons {
  display: flex;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
  overflow-x: auto;
  scrollbar-width: none; /* 隐藏滚动条（可选） */
}

.logo-icons img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  display: block;
}

/* 收缩状态下隐藏整个图标组 */
.sidebar.collapsed .logo-icons {
  display: none;
}

/* 折叠/展开按钮：绝对定位，始终距离右侧12px，垂直居中 */
.toggle-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
  z-index: 1;
}

.toggle-btn:hover {
  background-color: var(--primary-color-light);
  color: var(--primary-color);
}

/* 收缩状态下，调整 header 内边距，为按钮留出空间（可选） */
.sidebar.collapsed .sidebar-header {
  padding: 0 8px 0 12px;
}

/* 菜单列表样式不变 */
.menu-list {
  flex: 1;
  list-style: none;
  padding: 16px 8px;
  margin: 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  /* 加大内边距和底部间距 */
  padding: 14px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-secondary);
  white-space: nowrap;
}

/* 悬停效果 */
.menu-item:hover {
  background-color: var(--primary-color-light);
  color: var(--primary-color);
}

/* 选中高亮样式 */
.menu-item.active {
  background-color: rgba(43, 196, 186, 0.1);
  color: var(--primary-color);
  font-weight: 500;
}

.menu-item .el-icon {
  font-size: 20px;
  min-width: 20px;
}

.menu-text {
  font-size: 0.85rem; /* 略微加大字号 */
  transition: opacity 0.2s ease;
}

.sidebar.collapsed .menu-text {
  opacity: 0;
  width: 0;
  display: none;
}

.logo-icons img {
  transition: transform 0.3s ease;
}

.logo-icons img:hover {
  transform: rotate(360deg);
}
</style>
