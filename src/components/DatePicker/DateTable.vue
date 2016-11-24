<template>
  <table class="date-picker-table" @click="handleClick" @mousemove="handleMousemove">
    <tbody>
      <tr class="table-weeks">
        <td v-for="name in weekNames">{{name}}</td>
      </tr>
      <tr v-for="group in rows" class="table-day">
        <td v-for="item in group" :class="{'is-today': item.isToday, 'is-weekend': item.isWeekend, 'is-month': item.thisMonth}">
          <span>
            <span v-if="item.isToday" class="table-today">今日</span>
            {{item.value}}
          </span>
        </td>
      </tr>
      <tr class="table-week-tr">
        <td v-for="(name,index) in weekNames">{{index+1}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getWeekName, getYear, getMonth, getDayCountOfMonth, getFirstDayOfMonth, getDayOfWeek, getDate } from './util'
export default {
  name: 'DateTable',
  data() {
    return {

    }
  },
  props: ['selectMode', 'weekNames', 'today'],
  methods: {
    handleClick() {

    },
    handleMousemove() {

    }
  },
  computed: {
    rows() {
      let rows = [];
      const year = getYear(this.today)
      const month = getMonth(this.today)
      const date = getDate(this.today)
      const dayOfWeek = getDayOfWeek(this.today)
      const dayCountMonth = getDayCountOfMonth(year, month)
      const firstDayOfMonth = getFirstDayOfMonth(this.today)
      const firstDayOfWeek = getDayOfWeek(firstDayOfMonth)
      const dayCountPremonth = getDayCountOfMonth(year, month-1)

      let days = []
      if (firstDayOfWeek > 0) {
        for(let i = 0; i < firstDayOfWeek; i++) {
          days.push({
            value: dayCountPremonth - i,
            thisMonth: false
          })
        }
      }
      for(let i = 0; i < dayCountMonth; i++) {
        days.push({
          value: i+1,
          thisMonth: true
        })
      }
      if (days.length < 35) {
        let gutter = 35 - days.length
        for(let i = 0; i < gutter; i++) {
          days.push({
            value: i+1,
            thisMonth: false
          })
        }
      }
      //divided 5 groups every 7
      for(let j = 0; j < 5; j++) {
        let groups = []
        for(let i = j*7; i < (j+1)*7; i++) {
          let item = {}
          item.value = days[i].value
          item.thisMonth = days[i].thisMonth
          if (date === days[i].value) {
            item.isToday = true
          }
          if (i === 5 || i === 6 || i === 12 || i === 13 || i === 19 || i === 20 || i === 26 || i === 27 || i === 33 || i === 34) {
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
  .date-picker-table {
    table-layout: fixed;
    width: 100%;
  }
  .table-weeks {
    td {
      font-size: 12px;
      text-align: center;
      color: #666;
    }
  }
  .table-day {
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
      }
      &.is-weekend.is-month {
        background-color: #e5e5e5;
      }
      &.is-today {
        color: #F6704D;
        background-color: #fff;
        .table-today {
          font-size: 12px;
          font-weight: 400;
          display: block;
        }
      }
    }
  }
  .table-week-tr {
    td {
      width: 50px;
      height: 40px;
      font-size: 14px;
      font-weight: 600;
      color: #ddd;
      background-color: #fff;
    }
  }
</style>
