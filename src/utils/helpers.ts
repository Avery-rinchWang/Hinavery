import type { Plan } from '@/types/models'
import hinaIcon from '@/assets/images/deco_pins017001.png'
import cstIcon from '@/assets/images/deco_pins018001.png'
import ayaIcon from '@/assets/images/deco_pins016001.png'
import eveIcon from '@/assets/images/deco_pins020001.png'
import mayaIcon from '@/assets/images/deco_pins019001.png'

/** 提取时间范围（如 "13:00-17:00"） */
export function extractTimeRange(practiceTime: string): string {
  const parts = practiceTime.split(' ')
  return parts.length > 1 ? parts[1] : ''
}

/** 按日期 + 时间段 + 地点分组 */
export function groupPlansByDateTimeAndLocation(plans: Plan[]): Map<string, Plan[]> {
  const map = new Map<string, Plan[]>()
  for (const plan of plans) {
    const [datePart, timeRange] = plan.practiceTime.split(' ')
    const key = `${datePart}_${timeRange}_${plan.location}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(plan)
  }
  // 每组内按原始时间排序（如果需要）
  for (const [key, list] of map.entries()) {
    list.sort((a, b) => a.practiceTime.localeCompare(b.practiceTime))
    map.set(key, list)
  }
  return map
}

/** 格式化分组标题：5月20日 13:00-17:00 · 练习室A */
export function formatGroupTitleWithTime(
  dateStr: string,
  timeRange: string,
  location: string,
): string {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(year)}年${parseInt(month)}月${parseInt(day)}日 ${timeRange} · ${location}`
}

/** 负责人图标映射 */
export const responsibleIconMap: Record<string, string> = {
  hina: hinaIcon,
  cst: cstIcon,
  aya: ayaIcon,
  eve: eveIcon,
  maya: mayaIcon,
}

export function getResponsibleList(responsibleStr: string): string[] {
  return responsibleStr.split(',').map((s) => s.trim())
}
