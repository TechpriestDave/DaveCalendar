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
  date: now,
  year: now.year(),
  month: now.month(),
  day: now.date(),
  daysInMonth: now.daysInMonth(),
  dayOffset: generateDayOffset(new Moment(now.date(1)).weekday()),
};

const mutations = {
  [types.PICK_YEAR](state, year) {
    state.year = year;
    state.date = state.date.year(year);
  },
  [types.PICK_MONTH](state, month) {
    const moment = now.month(month);
    state.month = month;
    state.daysInMonth = moment.daysInMonth();
    state.dayOffset = generateDayOffset(new Moment(moment.month(state.month).date(1)).weekday());
    state.date = state.date.month(month);
  },
  [types.PICK_DAY](state, day) {
    state.day = day;
    state.date = state.date.date(day);
  },
};


export default {
  state,
  mutations,
};
