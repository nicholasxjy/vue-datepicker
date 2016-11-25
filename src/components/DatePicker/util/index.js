export const WEEK_NAMES = [
  'SUN',
  'MON',
  'TUE',
  'WEN',
  'THU',
  'FRI',
  'SAT'
]
// here format date => yyyy-MM-dd
export function formatDate(date) {
  date = new Date(date)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  month = `00${month}`.slice(-2)
  day = `00${day}`.slice(-2)
  return `${year}-${month}-${day}`
}

const WEEK_TIMESTAMP = 7*24*3600*1000

export function addWeeks(date, num) {
  date = new Date(date)
  let temp = date.getTime() + WEEK_TIMESTAMP*num
  return new Date(temp)
}

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
