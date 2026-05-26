import { defineStore } from 'pinia'
import { mockPhotos } from '@/mock/initData'
import type { Photo } from '@/types/models'
import { storage } from '@/utils/storage'

const STORAGE_KEY = 'photos'

export const useAlbumStore = defineStore('album', {
  state: () => ({
    photos: [] as Photo[],
  }),
  actions: {
    initPhotos() {
      if (import.meta.env.DEV) {
        this.photos = mockPhotos
        this.saveToLocal()
      } else {
        const stored = storage.get<Photo[]>(STORAGE_KEY)
        if (stored && stored.length) {
          this.photos = stored
        } else {
          this.photos = mockPhotos
          this.saveToLocal()
        }
      }
    },
    saveToLocal() {
      storage.set(STORAGE_KEY, this.photos)
    },
    addPhoto(base64: string) {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url: base64,
        createdAt: new Date().toISOString(),
      }
      this.photos.unshift(newPhoto)
      this.saveToLocal()
    },
    deletePhoto(id: string) {
      this.photos = this.photos.filter((p) => p.id !== id)
      this.saveToLocal()
    },
  },
})
