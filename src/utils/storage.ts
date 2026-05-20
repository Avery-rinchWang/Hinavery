export const storage = {
  get<T = unknown>(key: string): T | null {
    const val = localStorage.getItem(key)
    if (val) return JSON.parse(val) as T
    return null
  },
  set<T = unknown>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}
