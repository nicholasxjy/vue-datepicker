<template>
  <div class="datepicker">
    <div class="datepicker-main-panel">
      <date-header :year="year" :month="month" :change-year="changeYear" :change-month="changeMonth" :show-year="showYearTable" :show-month="showMonthTable"></date-header>
      <date-table :year="year" :month="month" :day="day" :select-day="selectDay"></date-table>
    </div>
    <div class="datepicker-year-panel" v-if="isShowYear">
      <year-table :year="year" :select-year="selectYear"></year-table>
    </div>
    <div class="datepicker-month-panel" v-if="isShowMonth">
      <month-table :select-month="selectMonth"></month-table>
    </div>
  </div>
</template>

<script>
  import DateHeader from './DateHeader.vue'
  import DateTable from './DateTable.vue'
  import YearTable from './YearTable.vue'
  import MonthTable from './MonthTable.vue'

  export default {
    name: 'DatePicker',
    components: {
      DateHeader,
      DateTable,
      YearTable,
      MonthTable
    },
    data() {
      return {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        isShowYear: false,
        isShowMonth: false
      }
    },
    methods: {
      changeYear(year) {
        this.year = year
      },
      changeMonth(month) {
        this.month = month
      },
      showYearTable() {
        this.isShowYear = true
      },
      showMonthTable() {
        this.isShowMonth = true
      },
      selectYear(year) {
        this.isShowYear = false
        this.year = year
      },
      selectMonth(month) {
        this.isShowMonth = false
        this.month = month
      },
      selectDay(day) {
        this.day = day
        const date = new Date(this.year, this.month, this.day)
        this.$emit('input', date)
      }
    }
  }
</script>

<style lang="css" scoped>
.datepicker {
  position: relative;
  z-index: 1000;
  width: 380px;
  background-color: #fff;
}
.datepicker-main-panel {
  padding: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
}
.datepicker-year-panel, .datepicker-month-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  background-color: #fff;
}
.datepicker-month-panel {
  display: flex;
  align-items: center;
}
</style>
