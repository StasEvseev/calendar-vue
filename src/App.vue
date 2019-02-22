<template>
  <div id="app">

    <Month :month="month" />
    <Sheet :days="days" :today="today" :slots="slots" />

  </div>
</template>

<script>
    import {Calendar} from 'dayspan';
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

        if (firstOfMonthWeek === 0) {
            days[6] = [1, new Date(today.getFullYear(), today.getMonth(), 2)];

            for (let i = 5; i >= 0; i--) {
                days[i] = [value, new Date(today.getFullYear(), today.getMonth() - 1, value + 1)];
                value -= 1;
            }
            value = 1;

        } else {
            for (let i = firstOfMonthWeek - 2; i >= 0; i--) {
                days[i] = [value, new Date(today.getFullYear(), today.getMonth() - 1, value + 1)];
                value -= 1;
            }
            value = 1;
            days[firstOfMonthWeek - 1] = [value, new Date(today.getFullYear(), today.getMonth(), value + 1)];

            for (let i = firstOfMonthWeek; i < 7; i++) {
                value += 1;
                days[i] = [value, new Date(today.getFullYear(), today.getMonth(), value + 1)];
            }
        }

        let last_day_passed = false;

        for (let k = 1; k < 6 && !last_day_passed; k++) {
            for (let m = 0; m < 7; m++) {
                if (value === lastDayOfMonthDay) {
                    last_day_passed = true;
                    value = 1;
                    if (m === 0) {
                        break
                    }
                } else {
                    value += 1;
                }
                if (last_day_passed) {
                    days.push([value, new Date(today.getFullYear(), today.getMonth() + 1, value + 1)]);
                } else {
                    days.push([value, new Date(today.getFullYear(), today.getMonth(), value + 1)]);
                }
            }
        }

        return days;
    }

    let today = new Date();

    let days = calculateDays(today.getMonth() + 1, today.getFullYear());
    let slots = {2019: {1: {21: [['10AM', 'meeting']]}}};

    let obj = {month: today.getMonth(), year: today.getFullYear()};

    export default {
        name: 'app',
        data: () => ({
            days: days,
            month: obj,
            today: today,
            slots: slots,
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
