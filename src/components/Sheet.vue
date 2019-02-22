<template>
    <div class="month">
      <div class="week" v-for="row in rows()">
        <div class="day" v-for="(day, i) in daysAtRow( row, 7 )">
           {{day}}
        </div>

      </div>
    </div>
</template>

<script>




export default {
    name: 'Sheet',
    data() {
        return {
        }
    },

    props: {
        days: Array
    },
    methods: {
        rows()
      {
        return Math.floor( this.days.length / 7 );
      },
        daysAtRow(row, rowSize)
      {
        let start = (row - 1) * rowSize;
        return this.days.slice( start, start + rowSize );
      },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .week {
  display: flex;
}

.day {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}

/*.week:first-of-type .day:first-of-type {*/
  /*margin-left: 42.85714%;*/
/*}*/

/*.week:last-of-type .day:last-of-type {*/
  /*margin-right: 14.285%;*/
/*}*/


.month {
  max-width: 560px;
  margin: 20px auto;
}

.week {
  height: 80px;
}

.day {
  color: #F98909;
  padding: 5px;
  background-color: transparentize(white, 0.30);
  box-shadow:
    -1px -1px #F9A440,
    inset -1px -1px 0 0 #F9A440;
}
</style>
