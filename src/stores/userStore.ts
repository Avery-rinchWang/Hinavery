import { defineStore } from 'pinia'
import { storage } from '@/utils/storage'

const STORAGE_KEY = 'user'

interface UserState {
  isLoggedIn: boolean
  username: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    username: '',
  }),
  actions: {
    initUser() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const username = localStorage.getItem('username') || ''
      this.isLoggedIn = isLoggedIn
      this.username = username
    },
    login(username: string) {
      this.isLoggedIn = true
      this.username = username
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('username')
    },
  },
})
