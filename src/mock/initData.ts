import type { Plan, Note, Photo, User } from '@/types/models'

export const mockPlans: Plan[] = [
  {
    id: '1',
    song: 'Brand new Pastel Road！',
    difficulty: '简单',
    progress: '未开始',
    responsible: 'hina,cst,aya,eve,maya',
    practiceTime: '2026-05-20 13:00-17:00',
    location: '练习室A',
    notes: '',
  },
  {
    id: '2',
    song: 'ぎゅっDAYS♪',
    difficulty: '中等',
    progress: '进行中',
    responsible: 'hina,aya',
    practiceTime: '2026-05-20 13:00-17:00',
    location: '练习室A',
    notes: '第一次练习，感觉很噜~',
  },
  {
    id: '3',
    song: 'あっつあつ 常夏 らぶ☆サマー！',
    difficulty: '困难',
    progress: '未开始',
    responsible: 'hina,cst,aya,eve,maya',
    practiceTime: '2026-05-20 13:00-17:00',
    location: '练习室A',
    notes: '',
  },
  {
    id: '4',
    song: 'Y.O.L.O！！！！！',
    difficulty: '困难',
    progress: '进行中',
    responsible: 'hina,cst,aya,eve,maya',
    practiceTime: '2026-05-21 10:00-12:00',
    location: '练习室B',
    notes: '第一次练习，还需要多加练习呜呜。第二次练习，开始噜起来了！',
  },
  {
    id: '5',
    song: 'もういちど ルミナス',
    difficulty: '中等',
    progress: '未开始',
    responsible: 'hina,cst,aya,eve,maya',
    practiceTime: '2026-05-21 10:00-12:00',
    location: '练习室B',
    notes: '',
  },
  {
    id: '6',
    song: '天下トーイツA to Z☆',
    difficulty: '困难',
    progress: '未开始',
    responsible: 'cst,eve,maya',
    practiceTime: '2026-05-21 14:00-16:00',
    location: '练习室A',
    notes: '',
  },
  {
    id: '7',
    song: '天下トーイツA to Z☆',
    difficulty: '困难',
    progress: '未开始',
    responsible: 'cst,eve,maya',
    practiceTime: '2026-05-20 13:00-17:00',
    location: '练习室A',
    notes: '',
  },
]

export const mockNotes: Note[] = []
export const mockPhotos: Photo[] = []
export const mockUser: User = { username: 'Hina' }
