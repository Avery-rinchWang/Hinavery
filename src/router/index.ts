import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MainLayout from '@/views/MainLayout.vue'
import PracticePlanView from '@/views/PracticePlanView.vue'
import SongDetailView from '@/views/SongDetailView.vue'
import NotesView from '@/views/NotesView.vue'
import AlbumView from '@/views/AlbumView.vue'
import AboutView from '@/views/AboutView.vue'
import AccountView from '@/views/AccountView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    redirect: '/plans',
    children: [
      {
        path: 'plans',
        name: 'plans',
        component: PracticePlanView,
        meta: { requiresAuth: true },
      },
      { path: 'plans', name: 'plans', component: PracticePlanView },
      { path: 'songs', name: 'songs', component: SongDetailView },
      { path: 'notes', name: 'notes', component: NotesView },
      { path: 'album', name: 'album', component: AlbumView },
      { path: 'about', name: 'about', component: AboutView },
      { path: 'account', name: 'account', component: AccountView },
      { path: '', redirect: '/plans' },
    ],
  },
  // 404 重定向到计划页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/plans',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 登录守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/plans')
  } else {
    next()
  }
})

export default router
