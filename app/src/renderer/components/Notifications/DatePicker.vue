<template lang="html">
  <div class="date-picker">
    <div class="calendar">
      <div class="calendar-header">
        <div class="arrow" v-on:click="previousMonth">
          <i class="material-icons md-36">keyboard_arrow_left</i>
        </div>
        <div class="date">
          <span class="bold">{{fullMonth}} {{$store.state.datePicker.year}}</span>
        </div>
        <div class="arrow" v-on:click="nextMonth">
          <i class="material-icons md-36">keyboard_arrow_right</i>
        </div>
      </div>
      <div class="calendar-grid">
        <header>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div class="green-text">S</div>
          <div class="green-text">S</div>
        </header>
        <transition :name="transition">
          <section :key="month">
            <div v-for="offset in $store.state.datePicker.dayOffset"></div>
            <span v-for="n in $store.state.datePicker.daysInMonth" v-on:click="changeDay($event, n)">
              <div v-if="n == $store.state.datePicker.currentDay && $store.state.datePicker.month == $store.state.datePicker.currentMonth && $store.state.datePicker.year == $store.state.datePicker.currentYear" class="today">
                <span>{{n}}</span>
              </div>
              <div v-else="n == $store.state.datePicker.day">
                <span>{{n}}</span>
              </div>
            </span>
          </section>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "../../vuex/mutation-types";
export default {
  mounted: function mounted() {
    $(document).on("click", ".calendar-grid div", function addClass() {
      if ($(this).text() !== "") {
        $(".calendar-grid div").removeClass("active");
        $(this).addClass("active");
      }
    });
  },
  beforeUpdate: function beforeUpdate() {
    $(".calendar-grid div").removeClass("active");
  },
  data: () => ({
    transition: "slide-right",
  }),
  computed: {
    month: function month() {
      return this.$store.state.datePicker.month;
    },
    fullMonth: function fullMonth() {
      return this.$store.state.calendar.monthNames[this.$store.state.datePicker.month];
    },
    date: function date() {
      return this.$store.state.datePicker.date.format("DD/MM/YYYY");
    },
    humanDate: function humanDate() {
      return this.$store.state.datePicker.date.format("MMMM Do, YYYY");
    },
  },
  methods: {
    nextMonth: function previousMonth() {
      this.transition = "slide-right";
      if (this.$store.state.datePicker.month === 11) {
        this.$store.commit(types.PICK_YEAR, this.$store.state.datePicker.year + 1);
        this.$store.commit(types.PICK_MONTH, 0);
      } else {
        this.$store.commit(types.PICK_MONTH, this.$store.state.datePicker.month + 1);
      }
    },
    previousMonth: function previousMonth() {
      this.transition = "slide-left";
      if (this.$store.state.datePicker.month === 0) {
        this.$store.commit(types.PICK_YEAR, this.$store.state.datePicker.year - 1);
        this.$store.commit(types.PICK_MONTH, 11);
      } else {
        this.$store.commit(types.PICK_MONTH, this.$store.state.datePicker.month - 1);
      }
    },
    changeDay: function changeDay(event, day) {
      const offset = this.$store.state.datePicker.dayOffset + day;
      if ((offset - 6) % 7 === 0 || offset % 7 === 0) {
        this.eventPaneColor = "#388e3c";
      } else {
        this.eventPaneColor = "#1F1A65";
      }
      this.$store.commit(types.SET_DAY, day);
    },
  },
};
</script>

<style lang="scss">
  .date-picker {
    .calendar-header {
      height: 36px;
      font-size: 24px;
      text-align: center;

      div {
        float: left;
      }

      .date {
        cursor: default;
        width: 80%;
        color: #FFF;
      }
      .arrow {
        width: 10%;
        i {
          color: #9e9e9e;
          transition: .3s ease;
          cursor: pointer;
        }
        i:hover { color: rgba(0,0,0,0.87); }
      }
    }
    .calendar-grid {
      font-size: 24px;
      position: relative;
      left: 50px;
      height: 280px;
      width: calc(100vw - 108px);

      span {
        display: block;
      }

      div {
        cursor: default;
        float: left;
        text-align: center;
        height: calc((100vw - 208px) / 7);
        width: calc((100vw - 208px) / 7);
        margin: 6px;
        border-radius: 50%;
        transition: .3s ease;
      }
      section {
        position: absolute;
        width: 100%;
        top: 2em;

        & > span {
          color: #FFF;
          div.active { background: #FFF; color: #1F1A65; font-weight: 500; }

          &:nth-child(7n+6), &:nth-child(7n) {
            color: #00c853;
            div.active { background: #00c853; color: #FFF; font-weight: 500; }
          }
        }

        div {
          position: relative;
          font-weight: 300;

          &.today {
            box-shadow: 0 0 2px 2px #1F1A65;
          }
          &.active {
            color: #FFF;
            box-shadow: none;
          }

          span {
            position: absolute;
            display: block;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
</style>
