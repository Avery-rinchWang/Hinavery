import type { Plan, Note, Photo, User } from '@/types/models'
import practice1 from '@/assets/images/背景图.jpg'
import practice2 from '@/assets/images/card_after_training.png'
import ph1 from '@/assets/images/1.png'
import ph2 from '@/assets/images/2.png'
import ph3 from '@/assets/images/3.png'
import ph4 from '@/assets/images/4.png'
import ph5 from '@/assets/images/5.png'
import ph6 from '@/assets/images/6.png'
import ph7 from '@/assets/images/7.png'
import ph8 from '@/assets/images/8.png'
import ph9 from '@/assets/images/9.png'
import ph10 from '@/assets/images/10.png'
import ph11 from '@/assets/images/11.png'
import ph12 from '@/assets/images/12.png'

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
    notes: '还需要多加练习呜呜。',
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

export const mockNotes: Note[] = [
  {
    id: 'note1',
    title: '期待演出！',
    content: '演出的时间越来越近啦！小日菜超期待的！！paspale的大家继续加油吧！噜~',
    createdAt: '2026-05-18T13:00:00Z',
  },
  {
    id: 'note2',
    title: '薯条薯条！',
    content: '今天的练习终于结束啦，和姐姐约好了今天一起去吃薯条，真是噜噜噜的一天！',
    createdAt: '2026-05-17T10:30:00Z',
  },
]

export const mockPhotos: Photo[] = [
  {
    id: '1',
    url: ph1,
    createdAt: '2026-05-22',
  },
  {
    id: '2',
    url: ph2,
    createdAt: '2026-05-22',
  },
  {
    id: '3',
    url: ph3,
    createdAt: '2026-05-22',
  },
  {
    id: '4',
    url: ph4,
    createdAt: '2026-05-22',
  },
  {
    id: '5',
    url: ph5,
    createdAt: '2026-05-22',
  },
  {
    id: '6',
    url: ph6,
    createdAt: '2026-05-22',
  },
  {
    id: '7',
    url: ph7,
    createdAt: '2026-05-22',
  },
  {
    id: '8',
    url: ph8,
    createdAt: '2026-05-22',
  },
  {
    id: '9',
    url: ph9,
    createdAt: '2026-05-22',
  },
  {
    id: '10',
    url: ph10,
    createdAt: '2026-05-22',
  },
  {
    id: '11',
    url: ph11,
    createdAt: '2026-05-22',
  },
  {
    id: '12',
    url: ph12,
    createdAt: '2026-05-22',
  },
  {
    id: '13',
    url: practice1,
    createdAt: '2026-05-21',
  },
  {
    id: '14',
    url: practice2,
    createdAt: '2026-05-20',
  },
]

export const mockUser: User = { username: 'Hina' }
