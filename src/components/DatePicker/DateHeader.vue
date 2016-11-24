<template lang="html">
  <div class="date-picker-header">
    <a class="date-picker-close" @click="closePicker"></a>
    <div class="picker-header-inner">
      <span>选择日期：</span>
      <span class="picker-header-action date-picker-min" @click="repickMinDate">2016-08-16</span>
      <span>至</span>
      <span class="picker-header-action date-picker-max" @click="repickMaxDate">2016-08-23</span>
      <span class="date-picker-search">查询</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateHeader',
  methods: {
    closePicker() {

    },
    repickMinDate() {

    },
    repickMaxDate() {

    }
  }
}
</script>

<style lang="scss">
  .date-picker-header {
    position: relative;
    z-index: 1000;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #dcdcdc;
  }
  .picker-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
  }
  .picker-header-action {
    display: block;
    width: 90px;
    height: 25px;
    border: 1px solid #0078EB;
    border-radius: 3px;
    line-height: 25px;
    text-align: center;
  }
  .date-picker-search {
    display: block;
    width: 38px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #0078EB;
    border: 1px solid #0078EB;
    border-radius: 3px;
  }
</style>
