import { defineStore } from 'pinia'
import { mockNotes } from '@/mock/initData'
import type { Note } from '@/types/models'
import { storage } from '@/utils/storage'

const STORAGE_KEY = 'notes'

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [] as Note[],
  }),
  actions: {
    initNotes() {
      if (import.meta.env.DEV) {
        this.notes = mockNotes
        this.saveToLocal()
      } else {
        const stored = storage.get<Note[]>(STORAGE_KEY)
        if (stored && stored.length) {
          this.notes = stored
        } else {
          this.notes = mockNotes
          this.saveToLocal()
        }
      }
    },
    saveToLocal() {
      storage.set(STORAGE_KEY, this.notes)
    },
    addNote(note: Omit<Note, 'id' | 'createdAt'>) {
      const newNote: Note = {
        ...note,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      this.notes.unshift(newNote) // 最新在上
      this.saveToLocal()
    },
    updateNote(id: string, updated: Partial<Omit<Note, 'id' | 'createdAt'>>) {
      const index = this.notes.findIndex((n) => n.id === id)
      if (index !== -1) {
        this.notes[index] = { ...this.notes[index], ...updated }
        this.saveToLocal()
      }
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter((n) => n.id !== id)
      this.saveToLocal()
    },
  },
})
