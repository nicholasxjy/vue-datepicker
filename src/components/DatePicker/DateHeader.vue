<template>
  <div class="datepicker-header">
    <a class="datepicker-header__month-trigger" @click="handleChangeMonth('prev')">
      <svg class="icon" width="200px" height="200px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M821.24616 82.434582c19.967881-16.383903 22.527866-45.567729 6.143963-65.535611s-45.567729-22.527866-65.53561-6.143963L202.75384 476.160239c-22.527866 18.43189-22.527866 52.735686 0 71.679573l558.588676 465.405231c19.967881 16.383903 49.151708 13.823918 65.53561-6.143963 16.383903-19.967881 13.823918-49.151708-6.143963-65.53561L262.657484 476.160239v71.679573l558.588676-465.40523z"  /></svg>
      <span>{{prevText}}月</span>
    </a>
    <div class="datepicker-header__current">
      <a class="datepicker-header__year" @click="handleShowYear">{{year}}年</a><a class="datepicker-header__month" @click="handleShowMonth">{{monthText}}月</a>
    </div>
    <a class="datepicker-header__month-trigger" @click="handleChangeMonth('next')">
      <span>{{nextText}}月</span>
      <svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M761.430769 547.767442v-71.469934L202.976287 941.674076c-19.761982 16.485985-22.423979 45.769958-5.938995 65.53194 16.484985 19.761982 45.769958 22.424979 65.531939 5.939994l558.557482-465.379568c22.320979-18.635983 22.320979-52.937951 0-71.469934L262.569231 10.81394c-19.761982-16.484985-49.046954-13.822987-65.531939 5.939994s-13.822987 49.045954 5.938995 65.53094L761.429769 547.767442z"  /></svg>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'DateHeader',
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      },
      month: {
        type: Number,
        default: new Date().getMonth()
      },
      changeYear: {
        type: Function
      },
      changeMonth: {
        type: Function
      },
      showYear: {
        type: Function
      },
      showMonth: {
        type: Function
      }
    },
    computed: {
      monthText() {
        return this.month + 1
      },
      prevText() {
        if (this.month === 0) {
          return 12
        }
        return this.month
      },
      nextText() {
        if (this.month === 11) {
          return 1
        }
        return this.month + 2
      }
    },
    methods: {
      handleChangeMonth(direct) {
        let tempYear = this.year
        let tempMonth = this.month
        if (direct === 'prev') {
          tempMonth -= 1
          if (tempMonth < 0) {
            tempMonth = 11
            tempYear -= 1
          }
        } else {
          tempMonth += 1
          if (tempMonth > 11) {
            tempMonth = 0
            tempYear += 1
          }
        }
        this.changeMonth(tempMonth)
        if (tempYear !== this.year) {
          this.changeYear(tempYear)
        }
      },
      handleShowYear() {
        this.showYear()
      },
      handleShowMonth() {
        this.showMonth()
      }
    }
  }
</script>

<style lang="scss" scoped>
.datepicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  height: 20px;
  padding-left: 10px;
  padding-right: 10px;
  color: #666;
  margin-bottom: 15px;
  user-select: none;
}
.datepicker-header__month-trigger {
  display: flex;
  align-items: center;
  span {
    padding: 0 3px;
  }
  svg {
    width: 10px;
    height: 10px;
  }
}
.datepicker-header__current {
  a {
    padding: 0 3px;
  }
}
</style>
