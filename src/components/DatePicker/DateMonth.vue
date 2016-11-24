<template lang="html">
  <div class="date-month">
    <span>{{currentMonth - 1}}月</span>
    <div class="date-month-center">
      <span class="year">{{currentYear}}年</span>
      <span class="month">{{currentMonth}}月</span>
    </div>
    <span>{{currentMonth + 1}}月</span>
  </div>
</template>

<script>
import { getCurrentYear, getCurrentMonth } from './util'

export default {
  name: 'DateMonth',
  props: ['today'],
  computed: {
    currentYear() {
      return getCurrentYear(this.today)
    },
    currentMonth() {
      return getCurrentMonth(this.today)
    }
  }
}
</script>

<style lang="css">
  .date-month {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
  }
</style>
