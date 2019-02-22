<template>
  <div id="app">

    <Month :month="month" />
    <Sheet :days="days" />

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { Calendar } from 'dayspan';
import Month from "./components/Month.vue";
import Sheet from "./components/Sheet.vue";


function calculateDays(month, year) {
    let today = new Date(year, month, 0);
    let lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    let firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let lastDayOfMonthDay = lastDayOfMonth.getDate();
    let firstOfMonthWeek = firstOfMonth.getDay();

    let days = [0, 0, 0, 0, 0, 0, 0];
    let value = lastDayOfPrevMonth.getDate();

    for (let i = firstOfMonthWeek - 2; i >= 0; i--) {
        days[i] = value;
        value -= 1;
    }
    value = 1;
    days[firstOfMonthWeek - 1] = value;

    for (let i = firstOfMonthWeek; i < 7; i++) {
        value += 1;
        days[i] = value;
    }

    let last_day_passed = false;

    for (let k = 1; k < 6 && !last_day_passed; k++) {
        for (let m = 0; m < 7; m++) {
            if (value === lastDayOfMonthDay) {
                last_day_passed = true;
                value = 1;
                // debugger
                if (m === 0) {
                    break
                }
            } else {
                value += 1;
            }
            days.push(value);
        }
    }

    return days;
}
  let today = new Date();

  let days = calculateDays(today.getMonth(), today.getFullYear());

  let obj = {month: today.getMonth(), year: today.getFullYear()};

export default {
  name: 'app',
  data: () => ({
    days: days,
      month: obj
  }),
    watch:
  {
    month:
    {
      deep: true,
      handler: 'resetMonth'
    }
  },
    methods: {
      resetMonth: function (v, v2) {
          console.log(v, v2);
          this.days = calculateDays(v.month + 1, v.year);
      }
    },
  components: {
      Month,
      HelloWorld,
      Sheet
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
</style>
