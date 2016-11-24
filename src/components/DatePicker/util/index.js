export const WEEK_NAMES = [
  'MON',
  'TUE',
  'WEN',
  'THU',
  'FRI',
  'SAT',
  'SUN'
]

export function getYear(date) {
  date = new Date(date)
  return date.getFullYear()
}

export function getMonth(date) {
  date = new Date(date)
  return date.getMonth()
}

export function getDate(date) {
  date = new Date(date)
  return date.getDate()
}

export function getDayOfWeek(date) {
  date = new Date(date)
  return date.getDay()
}
export function getWeekName(date) {
  date = new Date(date)
  return WEEK_NAMES[date.getDay()]
}

export function getDayCountOfMonth(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

export function getFirstDayOfMonth(date) {
  date = new Date(date)
  let temp = date.setDate(1)
  return new Date(temp)
}
