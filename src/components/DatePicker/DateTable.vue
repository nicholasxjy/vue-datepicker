<template>
  <div class="datepicker-table__wrap">
    <table class="datepicker-table__table">
      <tbody>
        <tr>
          <th v-for="(name, index) in weekNames" :key="index">{{name}}</th>
        </tr>
        <tr v-for="(row, index) in rows" :key="index" class="datepicker-table__row">
          <td v-for="(col, index) in row" :key="index" :class="{'is-today': col.isToday, 'is-weekend': col.isWeekend, 'in-month': col.isCurrentMonth}" @click="handleSelectDay(col)">
            <span v-if="col.isToday">今日</span>
            <span>{{col.value}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getDayCountOfMonth, getFirstDayOfMonth, getWeekNames } from './utils'

  export default {
    name: 'DateTable',
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      },
      month: {
        type: Number,
        default: new Date().getMonth()
      },
      day: {
        type: Number,
        default: new Date().getDate()
      },
      selectDay: {
        type: Function
      }
    },
    data() {
       return {
         weekNames: getWeekNames()
       }
    },
    computed: {
      rows() {
        const rows = []
        const days = []
        const dayCount = getDayCountOfMonth(this.year, this.month)
        const firstDayOfMonth = getFirstDayOfMonth(this.year, this.month, this.day)
        const firstDayOfWeek = firstDayOfMonth.getDay()
        const dayCountPrevMonth = getDayCountOfMonth(this.year, this.month - 1)
        if (firstDayOfWeek > 0) {
          for (const i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
              year: this.year,
              month: this.month - 1,
              value: dayCountPrevMonth - i,
              isCurrentMonth: false
            })
          }
        }

        for(const i = 0; i < dayCount; i++) {
          days.push({
            year: this.year,
            month: this.month,
            value: i + 1,
            isCurrentMonth: true
          })
        }

        if (days.length < 42) {
          const gutter = 42 - days.length
          for (let i = 0; i < gutter; i++) {
            days.push({
              year: this.year,
              month: this.month + 1,
              value: i + 1,
              isCurrentMonth: false
            })
          }
        }

        // first calculate weeks count
        // divided groups every 7 according to count above
        const weekCount = Math.ceil((firstDayOfWeek + dayCount) / 7)
        const today = new Date()
        const tyear = today.getFullYear()
        const tmonth = today.getMonth()
        const tdate = today.getDate()
        for (let j = 0; j < weekCount; j++) {
          const groups = []
          for (let i = j * 7; i < (j + 1) * 7; i++) {
            const item = {}
            item.value = days[i].value
            item.isCurrentMonth = days[i].isCurrentMonth
            item.year = days[i].year
            item.month = days[i].month
            if (tdate === days[i].value && tyear === days[i].year && tmonth === days[i].month && item.isCurrentMonth) {
              item.isToday = true
            } else {
              item.isToday = false
            }
            // you know there are 6 weeks at most, and numbers below can cover all
            // smarty pants ....? keep things simple, peace out!
            if (i === 0 || i === 6 || i === 7 || i === 13 || i === 14 || i === 20 || i === 21 || i === 27 || i === 28 || i === 34 || i === 35) {
              item.isWeekend = true
            } else {
              item.isWeekend = false
            }
            groups.push(item)
          }
          rows.push(groups)
        }
        return rows
      }
    },
    methods: {
      handleSelectDay(col) {
        if (col.isCurrentMonth) {
          this.selectDay(col.value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .datepicker-table__table {
    table-layout: fixed;
    width: 100%;
    user-select: none;
    th {
      font-size: 12px;
      color: #666;
      font-weight: 400;
    }
  }
  .datepicker-table__row {
    font-size: 12px;
    user-select: none;
    td {
      width: 50px;
      height: 40px;
      text-align: center;
      font-weight: 500;
      color: #ddd;
      background-color: #fff;
      span {
        display: block;
      }
      &.is-today {
        color: #f6704d !important;
      }
      &.is-weekend.in-month {
        background-color: #e5e5e5;
        color: #666;
      }
      &.in-month {
        background-color: #f2f2f2;
        color: #666;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #1482f0;
        }
      }
    }
  }
</style>
