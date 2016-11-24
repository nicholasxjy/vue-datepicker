<template>
  <table class="date-picker-table" @click="handleClick" @mousemove="handleMousemove">
    <tbody>
      <tr>
        <td v-for="name in weekNames">{{name}}</td>
      </tr>
      <tr>
        <td v-for="(name,index) in weekNames">{{index+1}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'DateTable',
  data() {
    return {

    }
  },
  props: ['selectMode', 'weekNames'],
  methods: {
    handleClick() {

    },
    handleMousemove() {

    }
  },
  computed: {
    rows: {

    }
  }
}
</script>

<style lang="scss">
  .date-picker-table {
    table-layout: fixed;
    width: 100%;
  }
</style>
