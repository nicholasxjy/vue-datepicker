<template>
  <div class="ws-date-picker__table-panel">
    <div class="ws-date-picker__month-wrapper">
      <span class="ws-date-picker__month-action" @click="preMonth">{{preMonthText}}月</span>
      <div class="ws-date-picker__month-current">
        <span class="year">{{year}}年</span>
        <span class="month">{{monthText}}月</span>
      </div>
      <span class="ws-date-picker__month-action" @click="nextMonth">{{nextMonthText}}月</span>
    </div>
    <table class="ws-date-picker__table" @mousemove="handleMousemove">
      <tbody>
        <tr class="ws-date-picker__table-weeknames">
          <td v-for="name in weekNames">{{name}}</td>
        </tr>
        <tr v-for="group in rows" class="ws-date-picker__table-day">
          <td v-for="item in group" :class="{'is-today': item.isToday, 'is-weekend': item.isWeekend, 'is-month': item.thisMonth}" @click="handleClick(item, $event)" :cell-index="item.value">
            <span>
              <span v-if="item.isToday" class="ws-date-picker__table-today">今日</span>
              {{item.value}}
            </span>
          </td>
        </tr>
        <tr class="ws-date-picker__table-weeknumbers">
          <td v-for="(name,index) in weekNames">{{index+1}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getWeekName, getYear, getMonth, getDayCountOfMonth, getFirstDayOfMonth, getDayOfWeek, getDate, WEEK_NAMES } from '../util'
export default {
  name: 'DateTable',
  props: ['year', 'month'],
  data() {
    return {
      weekNames: WEEK_NAMES,
      selectingState: false,
      startIndex: null,
      endIndex: null
    }
  },
  watch: {
    month: function(val) {
      this.resetSelect(true)
    }
  },
  created() {
    this.$on('resetPciker', () => {
      this.resetSelect(true)
    })
  },
  methods: {
    resetSelect(isChangeMonth=false) {
      let allTds = document.querySelectorAll('td.is-month')
      for(let j = 0, len = allTds.length; j < len; j++) {
        let td = allTds[j]
        td.classList.remove('in-select')
        if (isChangeMonth) {
          td.classList.remove('edge-pick-date')
        }
      }
      return allTds
    },
    handleClick(item, event) {
      if (!item.thisMonth) return
      let target = event.target
      if (target.tagName !== 'TD') {
        target = target.parentNode
      }
      if (!this.selectingState) {
        //here reset select styles
        this.resetSelect(true)
        this.$parent.$emit('startSelect', {year: item.year, month: item.month, date: item.value})
        target.classList.add('edge-pick-date')
        this.selectingState = true
        this.startIndex = item.value
      } else {
        if (item.value < this.startIndex) return
        this.$parent.$emit('endSelect', {year: item.year, month: item.month, date: item.value})
        target.classList.add('edge-pick-date')
        this.selectingState = false
        this.endIndex = item.value
      }
    },
    handleMousemove(event) {
      if (!this.selectingState) return
      let target = event.target
      if (target.tagName !== 'TD') {
        target = target.parentNode
      }
      let cellIndex = target.getAttribute('cell-index')
      cellIndex = parseInt(cellIndex, 10)
      if (!this.startIndex) return
      if (cellIndex < this.startIndex) return
      let gutter = cellIndex - this.startIndex
      let allTds = this.resetSelect()
      for(let i = 0; i < gutter; i++) {
        allTds[this.startIndex+i].classList.add('in-select')
      }
    },
    preMonth() {
      this.$parent.$emit('preMonth')
    },
    nextMonth() {
      this.$parent.$emit('nextMonth')
    }
  },
  computed: {
    preMonthText() {
      if (this.month === 0) {
        return '12'
      } else {
        return this.month
      }
    },
    monthText() {
      return this.month + 1
    },
    nextMonthText() {
      if (this.month >= 11) {
        return '1'
      } else {
        return this.month + 2
      }
    },
    rows() {
      let rows = [];
      const today = new Date()
      const year = getYear(today)
      const month = getMonth(today)
      const date = getDate(today)
      const dayOfWeek = getDayOfWeek(today)
      const dayCountMonth = getDayCountOfMonth(this.year, this.month)
      const tempDate = new Date(this.year, this.month, 1)
      const firstDayOfMonth = getFirstDayOfMonth(tempDate)
      const firstDayOfWeek = getDayOfWeek(firstDayOfMonth)
      const dayCountPremonth = getDayCountOfMonth(this.year, this.month-1)

      let days = []
      if (firstDayOfWeek > 0) {
        for(let i = firstDayOfWeek-1; i >=0; i--) {
          days.push({
            year: this.year,
            month: this.month,
            value: dayCountPremonth - i,
            thisMonth: false
          })
        }
      }
      for(let i = 0; i < dayCountMonth; i++) {
        days.push({
          year: this.year,
          month: this.month,
          value: i+1,
          thisMonth: true
        })
      }
      if (days.length < 42) {
        let gutter = 42 - days.length
        for(let i = 0; i < gutter; i++) {
          days.push({
            year: this.year,
            month: this.month,
            value: i+1,
            thisMonth: false
          })
        }
      }
      //first calculate weeks count
      //divided groups every 7 according to count above
      let weekCount = Math.ceil((firstDayOfWeek + dayCountMonth) / 7)
      for(let j = 0; j < weekCount; j++) {
        let groups = []
        for(let i = j*7; i < (j+1)*7; i++) {
          let item = {}
          item.value = days[i].value
          item.thisMonth = days[i].thisMonth
          item.year = days[i].year
          item.month = days[i].month
          if (date === days[i].value && year === this.year && month === this.month) {
            item.isToday = true
          }
          // you know there are 6 weeks at most, and numbers below can cover all
          // smarty pants ....? keep things simple, peace out!
          if (i === 0 || i === 6 || i === 7 || i === 13 || i === 14 || i === 20 || i === 21 || i === 27 || i === 28 || i === 34 || i === 35) {
            item.isWeekend = true
          }
          groups.push(item)
        }
        rows.push(groups)
      }
      return rows
    }
  }
}
</script>

<style lang="scss">
  .ws-date-picker__table {
    table-layout: fixed;
    width: 100%;
  }
  .ws-date-picker__table-weeknames {
    td {
      font-size: 12px;
      text-align: center;
      color: #666;
    }
  }
  .ws-date-picker__table-day {
    td {
      width: 50px;
      height: 40px;
      font-size: 14px;
      font-weight: 600;
      color: #ddd;
      background-color: #fff;
      &.is-month {
        color: #666;
        background-color: #f2f2f2;
        cursor: pointer;
      }
      &.is-weekend.is-month {
        background-color: #e5e5e5;
      }
      &.is-month.in-select {
        background-color: #D6E0F2;
      }
      &.is-month.edge-pick-date {
        color: #fff;
        background-color: #1478F0;
      }
      &.is-today {
        color: #F6704D;
        background-color: #fff;
        .ws-date-picker__table-today {
          font-size: 12px;
          font-weight: 400;
          display: block;
        }
      }
    }
  }
  .ws-date-picker__table-weeknumbers {
    td {
      width: 50px;
      height: 40px;
      font-size: 14px;
      font-weight: 600;
      color: #ddd;
      background-color: #fff;
    }
  }
  .ws-date-picker__month-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 25px;
    font-size: 12px;
    color: #666;
  }
  .ws-date-picker__month-current {
    font-size: 14px;
    color: #333;
  }
  .ws-date-picker__month-action {
    cursor: pointer;
  }
</style>
