const WEEK_NAMES_EN = [
  'SUN',
  'MON',
  'TUE',
  'WEN',
  'THU',
  'FRI',
  'SAT'
]
const WEEK_NAMES_CN = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
]

const MONTH_NAMES_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const MONTH_NAMES_CN = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
]
export function getWeekNames(lang = 'en') {
  if (lang === 'cn') {
    return WEEK_NAMES_CN
  }
  return WEEK_NAMES_EN
}
export function getMonthNames(lang = 'en') {
  if (lang === 'cn') {
    return MONTH_NAMES_CN
  }
  return MONTH_NAMES_EN
}

export function getDayCountOfMonth(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29
    } else {
      return 28
    }
  }

  return 31
}

export function getFirstDayOfMonth(year, month, day) {
  const date = new Date(year, month, day)
  let temp = date.setDate(1)
  return new Date(temp)
}
