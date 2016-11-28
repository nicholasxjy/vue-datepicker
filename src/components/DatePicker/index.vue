<template lang="html">
  <div v-if="isShow">
    <div class="ws-date-picker" >
      <date-header :min-date="minDate" :max-date="maxDate"></date-header>
      <div class="ws-date-picker__table-wrapper">
        <date-table ref="pickertable" :year="year" :month="month"></date-table>
      </div>
    </div>
  </div>
</template>

<script>
import DateTable from './src/DateTable.vue'
import DateHeader from './src/Header.vue'
import { getYear, getMonth, addWeeks } from './util'

export default {
  name: 'DatePicker',
  props: ['options'],
  components: {
    DateTable,
    DateHeader
  },
  data() {
    return {
      year: null,
      month: null,
      minDate: null,
      maxDate: null,
      isShow: false
    }
  },
  methods: {
    initPicker() {
      const today = new Date()
      if (!this.year) {
        this.year = getYear(today)
      }
      if (!this.month) {
        this.month = getMonth(today)
      }
      if (!this.minDate) {
        this.minDate = today
      }
      if (!this.maxDate) {
        this.maxDate = addWeeks(today, 1)
      }
    },
    resetPciker() {
      this.year = null
      this.month = null
      this.minDate = null
      this.maxDate = null
      this.initPicker()
      this.$refs.pickertable.$emit('resetPciker')
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    getPickDate() {
      return [this.minDate, this.maxDate]
    }
  },
  created() {
    this.initPicker()
    this.$on('preMonth', () => {
      this.month--
      if (this.month < 0) {
        this.month = 11
        this.year--
      }
    });

    this.$on('nextMonth', () => {
      this.month++
      if (this.month > 11) {
        this.month = 0
        this.year++
      }
    });

    this.$on('startSelect', (data) => {
      //here set minDate
      this.minDate = new Date(data.year, data.month, data.date)
    });

    this.$on('endSelect', (data) => {
      this.maxDate = new Date(data.year, data.month, data.date)
      this.options.getDate([this.minDate, this.maxDate])
    });

    this.$on('closePicker', () => {
      this.hide()
      this.resetPciker()
    });

    this.$on('repickMinDate', () => {
      this.year = getYear(this.minDate)
      this.month = getMonth(this.minDate)
    })

    this.$on('repickMaxDate', () => {
      this.year = getYear(this.maxDate)
      this.month = getMonth(this.maxDate)
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
  .ws-date-picker__table-wrapper {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 11px;
  }
</style>
