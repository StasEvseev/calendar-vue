<template>
    <div>


        <b-modal
                id="modalPrevent"
                v-model="showModal"
                ref="modal"
                title="Новое значение"
                @ok="handleOk"
        >
            <form @submit.stop.prevent="">

                <b-form-group label="Дата" v-if="isNew">
                    <datepicker v-if="isNew" v-model="date"></datepicker>
                </b-form-group>

                <b-form-group label="Время">
                    <b-form-input type="text" placeholder="Время" v-model="time"/>
                </b-form-group>

                <b-form-group label="Описание">
                    <b-form-input type="text" placeholder="Описание" v-model="description"/>
                </b-form-group>

                <b-form-group label="Продолжительность">
                    <b-form-input type="text" placeholder="Продолжительность" v-model="period"/>
                </b-form-group>

                <b-form-group label="Количество участников">
                    <b-form-input type="text" placeholder="Количество участников" v-model="countParticipant"/>
                </b-form-group>

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
                                style="">
                            <span>
                              {{slot.time}}
                            </span>

                            <span>
                              {{slot.description}}
                            </span>
                          </span>

                        </div>

                    </div>

                </div>

            </div>
        </div>

        <button type="button" v-on:click="createNewSlot()" class="add-event-today v-btn v-btn--active v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--light primary">
            <div class="v-btn__content">
                <i aria-hidden="true" class="v-icon material-icons theme--light">add</i>
            </div>
        </button>
    </div>
</template>

<script>
    import BFormInput from "bootstrap-vue/src/components/form-input/form-input";
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: 'Sheet',
        components: {BFormInput, Datepicker},
        data() {
            return {
                counter: 0,

                showModal: false,

                date: '',
                time: '',
                description: '',
                period: '',
                countParticipant: '',

                isNew: false,

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

            _initSlot(day) {
                if (!this.slots.hasOwnProperty(day.getFullYear())) {
                    this.slots[day.getFullYear()] = {};
                }
                if (!this.slots[day.getFullYear()].hasOwnProperty(day.getMonth())) {
                    this.slots[day.getFullYear()][day.getMonth()] = {};
                }

                if (!this.slots[day.getFullYear()][day.getMonth()].hasOwnProperty(day.getUTCDate())) {
                    this.slots[day.getFullYear()][day.getMonth()][day.getUTCDate()] = [];
                }
            },

            addEvent(day) {
                this._initSlot(day);

                this.slots[day.getFullYear()][day.getMonth()][day.getUTCDate()].push(
                    {
                        id: new Date().toString(),
                        time: '10AM',
                        description: 'Новый',
                        period: '1h',
                        countParticipant: 1,
                        date: new Date(day.getFullYear(), day.getMonth(), day.getUTCDate())
                    }
                );
                this.$forceUpdate();
            },

            handleOk() {
                if (this.isNew) {
                    let day = this.date;
                    this._initSlot(day);

                    this.slots[day.getFullYear()][day.getMonth()][day.getUTCDate()].push(
                        {
                            id: new Date().toString(),
                            time: this.time,
                            description: this.description,
                            period: this.period,
                            countParticipant: this.countParticipant,
                            date: new Date(day.getFullYear(), day.getMonth(), day.getUTCDate())
                        }
                    );
                    this.$forceUpdate();
                } else {
                    this.selectedSlot.time = this.time;
                    this.selectedSlot.description = this.description;
                    this.selectedSlot.period = this.period;
                    this.selectedSlot.countParticipant = this.countParticipant;
                }
                this.selectedSlot = null;
            },

            showEditorWindow(slot) {
                this.showModal = true;
                this.isNew = false;
                this.selectedSlot = slot;


                this.time = slot.time;
                this.description = slot.description;
                this.period = slot.period;
                this.countParticipant = slot.countParticipant;
            },

            createNewSlot() {
                this.showModal = true;
                this.isNew = true;

                this.time = '';
                this.description = '';
                this.period = '';
                this.countParticipant = '';
                this.selectedSlot = {};
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
        border-radius: 50%;
        padding: 5px;
        padding: 5px;
    }

    .calendar-event {

        background-color: rgb(159, 168, 218); color: rgb(255, 255, 255);

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

    .primary {
    background-color: #1976d2 !important;
    border-color: #1976d2 !important;
}

</style>
