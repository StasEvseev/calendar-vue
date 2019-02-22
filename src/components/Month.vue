<template>
  <div class="hello">

    <button type="button" @click="prevMonth" class="ds-light-forecolor ds-skinny-button v-btn v-btn--icon v-btn--depressed theme--light">
      <div class="v-btn__content">
        <i aria-hidden="true" class="v-icon material-icons theme--light">
          keyboard_arrow_left
        </i>
      </div>
    </button>

    <button type="button" @click="nextMonth" class="ds-light-forecolor ds-skinny-button v-btn v-btn--icon v-btn--depressed theme--light">
      <div class="v-btn__content">
        <i aria-hidden="true" class="v-icon material-icons theme--light">
          keyboard_arrow_right
        </i>
      </div>
    </button>

    <span>
      {{currentMonth}} {{currentYear}}
    </span>

  </div>

</template>

<script>
  const monthsCollection = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  // let index_ = 0;
export default {
    name: 'Month',
    data() {
        return {
            months: monthsCollection,
            currentMonth: monthsCollection[this.month['month']],
            currentYear: this.month['year'],
        }
    },
    props: [
        'month',
    ],
    methods: {
      prevMonth: function() {
          if (this.month['month'] === 0) {
              this.month['month'] = 11;
              this.month['year'] -= 1;
              this.currentYear -= 1;
          } else {
              this.month['month'] -= 1;
          }
          this.currentMonth = monthsCollection[this.month['month']];
      },
      nextMonth: function () {
          if (this.month['month'] === 11) {
              this.month['month'] = 0;
              this.month['year'] += 1;
              this.currentYear += 1;
          } else {
              this.month['month'] += 1;
          }
          this.currentMonth = monthsCollection[this.month['month']];
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
