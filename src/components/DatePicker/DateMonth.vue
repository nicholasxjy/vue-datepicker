<template lang="html">
  <div class="date-month">
    <span @click="preMonth">{{month - 1}}月</span>
    <div class="date-month-center">
      <span class="year">{{year}}年</span>
      <span class="month">{{month}}月</span>
    </div>
    <span @click="nextMonth">{{month + 1}}月</span>
  </div>
</template>

<script>
import { getYear, getMonth } from './util'

export default {
  name: 'DateMonth',
  props: ['today'],
  computed: {
    year() {
      return getYear(this.today)
    },
    month() {
      return getMonth(this.today) + 1
    }
  },
  methods: {
    preMonth() {
      this.$parent.$emit('preMonth', this.month)
    },
    nextMonth() {
      this.$parent.$emit('nextMonth', this.month)
    }
  }
}
</script>

<style lang="css">
  .date-month {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 25px;
    font-size: 12px;
    color: #666;
  }
  .date-month-center {
    font-size: 14px;
    color: #333;
  }
</style>
