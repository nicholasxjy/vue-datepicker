<template lang="html">
  <div class="ws-date-picker">
    <date-header></date-header>
    <date-month :today="today"></date-month>
    <div class="date-table-wrap">
      <date-table :select-mode="selectMode" :week-names="weekNames" :today="today"></date-table>
    </div>
  </div>
</template>

<script>
import DateTable from './DateTable.vue'
import DateHeader from './DateHeader.vue'
import DateMonth from './DateMonth.vue'
import { WEEK_NAMES } from './util'

export default {
  name: 'DatePicker',
  props: {
    selectMode: {
      type: String,
      default: 'whatever' // enum [day week month whatever]
    },
    weekNames: {
      type: Array,
      default: () => {
        return WEEK_NAMES
      }
    }
  },
  components: {
    DateTable,
    DateHeader,
    DateMonth
  },
  data() {
    return {
      today: new Date()
    }
  },
  created() {
    this.$on('preMonth', (currentMonth)=> {
      console.log(currentMonth)
    })

    this.$on('nextMonth', (currentMonth)=> {
      console.log(currentMonth)
    })
  }
}
</script>

<style lang="scss">
  .ws-date-picker {
    width: 386px;
    margin: 0 auto;
    background-color: #fff;
  }
  .date-table-wrap {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 11px;
  }
</style>
