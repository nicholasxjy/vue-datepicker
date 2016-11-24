export const WEEK_NAMES = [
  'MON',
  'TUE',
  'WEN',
  'THU',
  'FRI',
  'SAT',
  'SUN'
]

export function getCurrentYear(date) {
  date = new Date(date)
  return date.getFullYear()
}

export function getCurrentMonth(date) {
  date = new Date(date)
  return date.getMonth() + 1
}

export const getDayCountOfMonth = function(year, month) {
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
