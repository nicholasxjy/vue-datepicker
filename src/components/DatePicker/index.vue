<template lang="html">
  <div class="ws-date-picker">
    <date-header></date-header>
    <date-month :today="today"></date-month>
    <date-table :select-mode="selectMode" :week-names="weekNames" :today="today"></date-table>
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
  }
}
</script>

<style lang="scss">
  .ws-date-picker {
    width: 440px;
    margin: 0 auto;
    background-color: #fff;
  }
</style>
