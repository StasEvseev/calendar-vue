<template>
    <div>


        <b-modal
                id="modalPrevent"
                v-model="showModal"
                ref="modal"
                title="Новое значение"
                @ok="handleOk"
        >
            <form @submit.stop.prevent="handleSubmit">
                <b-form-group

                >
                    <b-form-input type="text" placeholder="Время" v-model="time"/>
                </b-form-group>

                <b-form-input type="text" placeholder="Описание" v-model="description"/>
            </form>
        </b-modal>

        <div class="month">

            <div class="week" v-for="row in rows()">
                <div class="day" v-for="(day, i) in daysAtRow( row, 7 )"
                     v-on:dblclick="counter += 1; addEvent(day[1])"
                >
                    <div class="calendar-day-card">
            <span v-bind:class="[{ today: today.getUTCDate() === day[1].getUTCDate() && today.getMonth() === day[1].getMonth() && today.getFullYear() === day[1].getFullYear()}]">
              {{day[1].getUTCDate()}}
            </span>
                    </div>

                    <div v-if="slots.hasOwnProperty(day[1].getFullYear()) && slots[day[1].getFullYear()].hasOwnProperty(day[1].getMonth()) && slots[day[1].getFullYear()][day[1].getMonth()].hasOwnProperty(day[1].getUTCDate())">
                        <div v-for="slot in slots[day[1].getFullYear()][day[1].getMonth()][day[1].getUTCDate()]"
                             v-on:click="showEditorWindow(slot);"
                        >
                          <span class="calendar-event"
                                style="top: 0px; background-color: rgb(159, 168, 218); color: rgb(255, 255, 255); left: 0px; right: 0px; text-decoration: inherit;">
                            <span>
                              {{slot[1]}}
                            </span>

                            <span>
                              {{slot[2]}}
                            </span>
                          </span>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>


    import BFormInput from "bootstrap-vue/src/components/form-input/form-input";

    export default {
        name: 'Sheet',
        components: {BFormInput},
        data() {
            return {
                counter: 0,
                showModal: false,
                time: '',
                description: '',
                selectedSlot: null,
            }
        },

        props: {
            days: Array,
            today: Date,
            slots: Object,
        },
        methods: {
            rows() {
                return Math.floor(this.days.length / 7);
            },
            daysAtRow(row, rowSize) {
                let start = (row - 1) * rowSize;
                return this.days.slice(start, start + rowSize);
            },

            addEvent(day) {
                if (!this.slots.hasOwnProperty(day.getFullYear())) {
                    this.slots[day.getFullYear()] = {};
                }
                if (!this.slots[day.getFullYear()].hasOwnProperty(day.getMonth())) {
                    this.slots[day.getFullYear()][day.getMonth()] = {};
                }

                if (!this.slots[day.getFullYear()][day.getMonth()].hasOwnProperty(day.getUTCDate())) {
                    this.slots[day.getFullYear()][day.getMonth()][day.getUTCDate()] = [];
                }

                this.slots[day.getFullYear()][day.getMonth()][day.getUTCDate()].push([new Date().toString(), '10AM', 'TEST']);
                this.$forceUpdate();
            },

            handleOk() {
                this.selectedSlot[1] = this.time;
                this.selectedSlot[2] = this.description;
                this.selectedSlot = null;
            },

            showEditorWindow(slot) {
                this.showModal = true;
                this.selectedSlot = slot;
                this.time = slot[1];
                this.description = slot[2];
            }

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
        max-width: 1000px;
        margin: 20px auto;
    }

    .week {
        height: 140px;
    }

    .calendar-day-card {
        text-align: left;
    }

    .day {
        /*color: #F98909;*/
        padding: 5px;
        background-color: transparentize(white, 0.30);
        box-shadow: -1px -1px #F9A440,
        inset -1px -1px 0 0 #F9A440;
    }

    .today {
        background-color: red;
        font-weight: bold;
        color: black;
        font-size: 17px;
    }

    .calendar-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        display: block;
        margin: 0;
        border-radius: 2px;
        pointer-events: all;
    }

</style>
