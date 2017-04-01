<template>
  <div id="app">
    <div class="content">
      <a class="trigger" @click="showDatePicker">Select Date</a>
      <div class="date-picker-container" v-if="isShow">
        <date-picker v-model="selectDate"></date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker/Index.vue'
export default {
  name: 'app',
  components: {
    DatePicker
  },
  watch: {
    selectDate(val) {
      alert(val)
    }
  },
  data() {
    return {
      selectDate: null,
      isShow: false
    }
  },
  methods: {
    showDatePicker() {
      this.isShow = true
    }
  }
}
</script>
<style src="normalize.css"></style>
<style>
html, body {
  margin: 0;
  padding: 0;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, sans-serif, "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
}
.content {
  width: 800px;
  height: 600px;
  margin: 100px auto;
  border: 1px solid #efefef;
  border-radius: 4px;
  background-color: #fafafa;
}
a {
  cursor: pointer;
}
.trigger {
  display: block;
  width: 150px;
  height: 44px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
}
.date-picker-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
