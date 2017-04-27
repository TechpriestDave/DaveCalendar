import * as types from "../mutation-types";
import Moment from "Moment";

function generateDayOffset(weekday) {
  if (weekday === 0) {
    return 7;
  }
  return weekday - 1;
}

const now = new Moment();

const state = {
  now,
  currentYear: now.year(),
  currentMonth: now.month(),
  currentDay: now.date(),
  date: now,
  year: now.year(),
  month: now.month(),
  day: now.date(),
  daysInMonth: now.daysInMonth(),
  dayOffset: generateDayOffset(new Moment(now.date(1)).weekday()),
  monthNames: [
    "January", "February", "Mars",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December",
  ],
};

const mutations = {
  [types.SET_YEAR](state, year) {
    state.year = year;
    state.date = state.date.year(year);
  },
  [types.SET_MONTH](state, month) {
    const moment = now.month(month);
    state.month = month;
    state.daysInMonth = moment.daysInMonth();
    state.dayOffset = generateDayOffset(new Moment(moment.month(state.month).date(1)).weekday());
    state.date = state.date.month(month);
  },
  [types.SET_DAY](state, day) {
    state.day = day;
    state.date = state.date.date(day);
  },
};


export default {
  state,
  mutations,
};
