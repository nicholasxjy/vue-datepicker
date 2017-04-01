<template>
  <div class="datepciker-year__table-wrap">
    <div class="datepicker-year__table-header">
      <a class="datepicker-year__table-header-prev" @click="handlePrev">
        <svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M1002.392849 82.724625c20.917231-16.268957 23.241367-46.482735 6.972411-65.075828s-46.482735-23.241367-65.075829-6.97241l-557.792814 464.827345c-23.241367 18.593094-23.241367 53.455145 0 72.048239l557.792814 464.827345c20.917231 16.268957 48.806871 13.94482 65.075829-6.97241s13.94482-48.806871-6.972411-65.075828l-557.792814-464.827346v72.048239l557.792814-464.827346z"  /><path fill="#333333" d="M637.503383 82.724625c20.917231-16.268957 23.241367-46.482735 6.97241-65.075828-16.268957-20.917231-46.482735-23.241367-65.075828-6.97241l-557.792814 464.827345c-23.241367 18.593094-23.241367 53.455145 0 72.048239l557.792814 464.827345c20.917231 16.268957 48.806871 13.94482 65.075828-6.97241s13.94482-48.806871-6.97241-65.075828l-557.792814-464.827346v72.048239l557.792814-464.827346z"  /></svg>
      </a>
      <div class="datepicker-year__table-header-text">{{ `${startYear} - ${startYear + 19}`}}</div>
      <a class="datepicker-year__table-header-next" @click="handleNext">
        <svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M577.163636 546.909091v-72.145455l-558.545454 465.454546c-20.945455 16.290909-23.272727 46.545455-6.981818 65.163636 16.290909 20.945455 46.545455 23.272727 65.163636 6.981818l558.545455-465.454545c23.272727-18.618182 23.272727-53.527273 0-72.145455L76.8 9.309091c-18.618182-13.963636-46.545455-11.636364-62.836364 6.981818S0 65.163636 20.945455 81.454545l556.218181 465.454546z"  /><path fill="#333333" d="M944.872727 546.909091v-72.145455l-558.545454 465.454546c-20.945455 16.290909-23.272727 46.545455-6.981818 65.163636 16.290909 20.945455 46.545455 23.272727 65.163636 6.981818l558.545454-465.454545c23.272727-18.618182 23.272727-53.527273 0-72.145455l-558.545454-465.454545c-20.945455-16.290909-48.872727-13.963636-65.163636 6.981818-16.290909 20.945455-13.963636 48.872727 6.981818 65.163636l558.545454 465.454546z"  /></svg>
      </a>
    </div>
    <table class="datepciker-year__table">
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(col, index) in row" :key="index" :class="{'active': col.isCurrentYear}" @click="handleSelectYear(col)">{{ col.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'YearTable',
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      },
      selectYear: {
        type: Function
      }
    },
    watch: {
      year(val) {
        if (val) {
          this.tyear = val
        }
      }
    },
    data() {
      return {
        tyear: new Date().getFullYear()
      }
    },
    computed: {
      startYear() {
        return Math.floor(this.tyear / 10) * 10
      },
      rows() {
        const startYear = Math.floor(this.tyear / 10) * 10
        const years = []
        const rows = []
        for(const i = 0; i < 20; i++) {
          years.push(startYear + i)
        }
        // group every 5
        for(const i = 0; i < 5; i++) {
          const group = []
          for(const j = i * 4; j < (i + 1) * 4; j++) {
            group.push({
              value: years[j],
              isCurrentYear: years[j] === this.year
            })
          }
          rows.push(group)
        }
        return rows
      }
    },
    methods: {
      handleNext() {
        this.tyear += 20
      },
      handlePrev() {
        this.tyear -= 20
      },
      handleSelectYear(col) {
        this.selectYear(col.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
.datepciker-year__table-wrap {
  padding: 15px;
}
.datepicker-year__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
}
.datepicker-year__table-header {
  font-size: 14px;
  color: #666;
  svg {
    width: 12px;
    height: 12px;
    path {
      fill: #666;
    }
  }
}
.datepciker-year__table {
  table-layout: fixed;
  width: 100%;
  user-select: none;
  td {
    font-size: 14px;
    font-weight: 500;
    color: #666;
    text-align: center;
    height: 40px;
    background-color: #f2f2f2;
    cursor: pointer;
    &:hover, &.active {
      background-color: #1482f0;
      color: #fff;
    }
  }
}
</style>
