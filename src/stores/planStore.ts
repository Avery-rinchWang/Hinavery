import { defineStore } from 'pinia'
import { mockPlans } from '@/mock/initData'
import type { Plan } from '@/types/models'
import { storage } from '@/utils/storage'
import { groupPlansByDateTimeAndLocation } from '@/utils/helpers'

const STORAGE_KEY = 'plans'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plans: [] as Plan[],
  }),

  actions: {
    initPlans() {
      if (import.meta.env.DEV) {
        this.plans = mockPlans
        this.saveToLocal()
      } else {
        const stored = storage.get<Plan[]>(STORAGE_KEY)
        if (stored && stored.length) {
          this.plans = stored
        } else {
          this.plans = mockPlans
          this.saveToLocal()
        }
      }
    },
    saveToLocal() {
      storage.set(STORAGE_KEY, this.plans)
    },
    addPlan(plan: Omit<Plan, 'id'>) {
      const newPlan = { ...plan, id: Date.now().toString() }
      this.plans.push(newPlan)
      this.saveToLocal()
    },
    updatePlan(id: string, updated: Partial<Plan>) {
      const index = this.plans.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.plans[index] = { ...this.plans[index], ...updated }
        this.saveToLocal()
      }
    },
    deletePlan(id: string) {
      this.plans = this.plans.filter((p) => p.id !== id)
      this.saveToLocal()
    },
  },

  getters: {
    groupedPlans(): { dateStr: string; timeRange: string; location: string; plans: Plan[] }[] {
      const map = groupPlansByDateTimeAndLocation(this.plans)
      return Array.from(map.entries()).map(([key, plans]) => {
        const [dateStr, timeRange, location] = key.split('_')
        return { dateStr, timeRange, location, plans }
      })
    },
  },
})
