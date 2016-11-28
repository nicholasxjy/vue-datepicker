<template lang="html">
  <div class="ws-date-picker__header">
    <a class="ws-date-picker__close" @click="closePicker">Close</a>
    <div class="ws-date-picker__header-body">
      <div class="ws-date-picker__header-body-inner">
        <span>选择日期：</span>
        <span class="ws-date-picker__header-action header-action-min" :class="{'active': isMinPicking}" @click="repickMinDate">{{leftDate}}</span>
        <span>至</span>
        <span class="ws-date-picker__header-action header-action-max" :class="{'active': !isMinPicking}" @click="repickMaxDate">{{rightDate}}</span>
        <span class="ws-date-picker__search" @click="pickSearch">查询</span>
      </div>
    </div>
    <div class="ws-date-picker__indicator" :class="{'max': !isMinPicking}"></div>
  </div>
</template>

<script>
import { formatDate } from '../util'
export default {
  name: 'DateHeader',
  props: ['minDate', 'maxDate'],
  data() {
    return {
      isMinPicking: true
    }
  },
  methods: {
    closePicker() {
      this.$parent.$emit('closePicker')
    },
    repickMinDate() {
      this.isMinPicking = true
      this.$parent.$emit('repickMinDate')
    },
    repickMaxDate() {
      this.isMinPicking = false
      this.$parent.$emit('repickMaxDate')
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
  .ws-date-picker__header-body-inner {
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
  .ws-date-picker__indicator {
    position: absolute;
    width: 38px;
    left: 119px;
    bottom: 0;
    height: 6px;
    overflow: hidden;
    transition: 300ms;
    transition-timing-function: ease-out;
    transition-property: left;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 38px;
      height: 1px;
      box-sizing: border-box;
      border-bottom: 1px solid #0078EB;
    }
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 56%;
      width: 5px;
      height: 5px;
      border: 1px solid #0078EB;
      background: #fff;
      -webkit-transform: rotate(45deg) translate(-7px,2px);
      transform: rotate(45deg) translate(-7px,2px);
      z-index: 10;
    }
    &.max {
      left: 253px;
    }
  }
</style>
