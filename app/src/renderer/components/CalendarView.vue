<template lang="html">
  <div class="calendar-view">
    <div class="calendar">
      <div class="calendar-header">
        <div class="arrow" v-on:click="previousMonth">
          <i class="material-icons md-36">keyboard_arrow_left</i>
        </div>
        <div class="date">
          <span class="bold">{{fullMonth}} {{$store.state.calendar.year}}</span>
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
            <div v-for="offset in $store.state.calendar.dayOffset"></div>
            <span v-for="n in $store.state.calendar.daysInMonth" v-on:click="changeDay($event, n)">
              <div v-if="n == $store.state.calendar.currentDay && $store.state.calendar.month == $store.state.calendar.currentMonth && $store.state.calendar.year == $store.state.calendar.currentYear" class="today">
                <span>{{n}}</span>
              </div>
              <div v-else="n == $store.state.calendar.day">
                <span>{{n}}</span>
              </div>
            </span>
          </section>
        </transition>
      </div>
    </div>
    <div class="event-pane" :style="{background: eventPaneColor}">
      <h2 class="human-date light">{{humanDate}}</h2>
      <span class="date">{{date}}</span>
      <div class="event-box">
        <div class="stripe"></div>
        <div class="event">
          <div class="locator" :style="{background: eventPaneColor}"></div>
          <div class="title">Fotbollsmöte</div>
          <div class="location"><i class="material-icons md-16">location_on</i>Stockholm</div>
          <div class="time"><i class="material-icons md-16">alarm</i>12:00</div>
        </div>
        <div class="event">
          <div class="locator" :style="{background: eventPaneColor}"></div>
          <div class="title">Tyskmakt möte</div>
          <div class="location"><i class="material-icons md-16">location_on</i>Götebord</div>
          <div class="time"><i class="material-icons md-16">alarm</i>16:30</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralTasks from "./Tasks/GeneralTasks";
import TodaysTasks from "./Tasks/TodaysTasks";
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
  updated: function updated() {

  },
  data: () => ({
    transition: "slide-right",
    eventPaneColor: "#1F1A65",
  }),
  computed: {
    month: function month() {
      return this.$store.state.calendar.month;
    },
    fullMonth: function fullMonth() {
      return this.$store.state.calendar.monthNames[this.$store.state.calendar.month];
    },
    date: function date() {
      return this.$store.state.calendar.date.format("DD/MM/YYYY");
    },
    humanDate: function humanDate() {
      return this.$store.state.calendar.date.format("MMMM Do, YYYY");
    },
  },
  methods: {
    nextMonth: function previousMonth() {
      this.transition = "slide-right";
      this.$store.dispatch("incrementMonth");
    },
    previousMonth: function previousMonth() {
      this.transition = "slide-left";
      this.$store.dispatch("decrementMonth");
    },
    changeDay: function changeDay(event, day) {
      const offset = this.$store.state.calendar.dayOffset + day;
      if ((offset - 6) % 7 === 0 || offset % 7 === 0) {
        this.eventPaneColor = "#388e3c";
      } else {
        this.eventPaneColor = "#1F1A65";
      }
      this.$store.dispatch("setDay", day);
    },
  },
  components: {
    GeneralTasks,
    TodaysTasks,
  },
};
</script>

<style lang="scss">
  .calendar-view {
    *::selection {
      background: transparent;
    }
    .calendar-header {
      height: 48px;
      font-size: 24px;
      text-align: center;

      div {
        float: left;
      }

      .date {
        cursor: default;
        width: 80%;
        color: #1F1A65;
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
      height: 280px;

      span {
        display: block;
      }

      div {
        cursor: default;
        float: left;
        text-align: center;
        height: calc((100vw - 108px) / 7);
        width: calc((100vw - 108px) / 7);
        margin: 6px;
        border-radius: 50%;
        transition: .3s ease;
      }
      section {
        position: absolute;
        width: 100%;
        top: 2em;

        & > span {
          color: #1F1A65;
          div.active { background: #1F1A65; }

          &:nth-child(7n+6), &:nth-child(7n) {
            color: #388e3c;
            div.active { background: #388e3c; }
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
    .event-pane {
      position: fixed;
      left: 0;
      bottom: 0;
      height: 220px;
      width: 100%;
      padding: 18px 28px;
      color: #FFF;
      transition: .3s ease;
      box-shadow: inset 0 18px 10px -10px rgba(90, 90, 90, .3);

      .human-date { margin: 4px 0; }
      .date { font-size: 18px; font-weight: 200; }
      .event-box {
        padding: 12px;

        .event {
          position: relative;
          padding-bottom: 12px;
        }
        .stripe {
          float: left;
          height: 200px;
          width: 4px;
          margin-right: 24px;
          border-right: dotted 2px rgba(255, 255, 255, .5);

        }
        .locator {
          position: absolute;
          height: 14px;
          width: 14px;
          top: 6px;
          left: -4px;
          border-radius: 50%;
          border: solid 1px rgba(255, 255, 255, .7);
        }
        .title {
          font-size: 18px;
          font-weight: 300;
          height: 20px;
        }
        .location, .time {
          font-size: 16px;
          font-weight: 200;
        }
        i {
          position: relative;
          top: 2px;
          margin-right: 6px;
          font-size: 16px;
        }
      }
    }
  }
</style>
