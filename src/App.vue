<template>
  <div id="app">
    <div class="content">
      <a @click="showDatepicker">show datepicker</a>
      <date-picker ref="datepicker" :options="opts"></date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker'

export default {
  name: 'app',
  components: {
    DatePicker
  },
  data() {
    return {
      opts: {
        getDate: (data)=> {
          console.log(data)
        }
      }
    }
  },
  methods: {
    showDatepicker() {
      this.$refs.datepicker.show()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
  padding: 5px 15px;
}
</style>
