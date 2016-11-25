<template lang="html">
  <div class="ws-date-picker__header">
    <a class="ws-date-picker__close" @click="closePicker">Close</a>
    <div class="ws-date-picker__header-body">
      <span>选择日期：</span>
      <span class="ws-date-picker__header-action header-action-min" @click="repickMinDate">{{leftDate}}</span>
      <span>至</span>
      <span class="ws-date-picker__header-action header-action-max" @click="repickMaxDate">{{rightDate}}</span>
      <span class="ws-date-picker__search" @click="pickSearch">查询</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../util'
export default {
  name: 'DateHeader',
  props: ['minDate', 'maxDate'],
  methods: {
    closePicker() {
      this.$parent.$emit('closePicker')
    },
    repickMinDate() {

    },
    repickMaxDate() {

    },
    pickSearch() {

    }
  },
  computed: {
    leftDate() {
      return formatDate(this.minDate)
    },
    rightDate() {
      return formatDate(this.maxDate)
    }
  }
}
</script>

<style lang="scss">
  .ws-date-picker__header {
    position: relative;
    z-index: 1000;
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #dcdcdc;
  }
  .ws-date-picker__header-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
  }
  .ws-date-picker__header-action {
    display: block;
    width: 90px;
    height: 25px;
    border-radius: 3px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
    color: #6D6E70;
    background-color: #F2F2F2;
    border: 1px solid #dcdcdc;
    &.active {
      border: 1px solid #0078EB;
      color: #0078EB;
      background-color: #fff;
    }
  }
  .ws-date-picker__search {
    display: block;
    width: 38px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #0078EB;
    border: 1px solid #0078EB;
    border-radius: 3px;
  }
  .ws-date-picker__close {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #666;
    font-size: 12px;
    cursor: pointer;
  }
</style>
