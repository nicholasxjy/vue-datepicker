<template>
  <div class="datepicker-month__table-wrap">
    <table class="datepicker-month__table">
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(col, index) in row" :key="index" @click="handleSelectMonth(col)">{{col.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getMonthNames } from './utils'
  export default {
    name: 'MonthTable',
    props: {
      selectMonth: {
        type: Function
      }
    },
    data() {
      return {
        monthNames: getMonthNames()
      }
    },
    computed: {
      rows() {
        const rows = []
        for(const i = 0; i < 3; i++) {
          const group = []
          for(const j = i * 4; j < (i + 1) * 4; j++) {
            group.push({
              value: j,
              name: this.monthNames[j]
            })
          }
          rows.push(group)
        }
        return rows
      }
    },
    methods: {
      handleSelectMonth(col) {
        this.selectMonth(col.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
.datepicker-month__table-wrap {
  padding: 15px;
}
.datepicker-month__table {
  table-layout: fixed;
  width: 100%;
  user-select: none;
  td {
    font-size: 14px;
    font-weight: 500;
    color: #666;
    text-align: center;
    height: 80px;
    background-color: #f2f2f2;
    cursor: pointer;
    &:hover, &.active {
      background-color: #1482f0;
      color: #fff;
    }
  }
}
</style>
