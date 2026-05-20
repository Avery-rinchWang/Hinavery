export interface Plan {
  id: string
  song: string
  difficulty: '简单' | '中等' | '困难'
  progress: '未开始' | '进行中' | '已完成'
  responsible: string // 存储格式：'hina,cst,aya,eve,maya' 多个负责人用逗号分隔
  practiceTime: string // 例如 '2026-05-20 13:00-17:00' 包含日期和时间段
  location: string
  notes?: string
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

export interface Photo {
  id: string
  url: string
  createdAt: string
}

export interface User {
  username: string
  avatar?: string
}
