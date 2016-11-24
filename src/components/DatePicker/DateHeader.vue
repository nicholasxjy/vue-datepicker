<template lang="html">
  <div class="date-picker-header">
    <a class="date-picker-close" @click="closePicker"></a>
    <div class="picker-header-inner">
      <span>选择日期：</span>
      <span class="picker-header-action date-picker-min" @click="repickMinDate">2016-08-16</span>
      <span>至</span>
      <span class="picker-header-action date-picker-max" @click="repickMaxDate">2016-08-23</span>
      <span class="picker-header-action date-picker-search">查询</span>
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
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #efefef;
  }
  .picker-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .picker-header-action {
    display: block;
    padding: 5px 8px;
    border: 1px solid #0078EB;
    border-radius: 3px;
  }
</style>
