import * as types from "./mutation-types";

export const setYear = ({ commit }, year) => {
  commit(types.SET_YEAR, year);
};
export const setMonth = ({ commit }, month) => {
  commit(types.SET_MONTH, month);
};
export const incrementMonth = ({ commit, state }) => {
  if (state.calendar.month === 11) {
    commit(types.SET_YEAR, state.calendar.year + 1);
    commit(types.SET_MONTH, 0);
  } else {
    commit(types.SET_MONTH, state.calendar.month + 1);
  }
};
export const decrementMonth = ({ commit, state }) => {
  if (state.calendar.month === 0) {
    commit(types.SET_YEAR, state.calendar.year - 1);
    commit(types.SET_MONTH, 11);
  } else {
    commit(types.SET_MONTH, state.calendar.month - 1);
  }
};
export const setDay = ({ commit }, day) => {
  commit(types.SET_DAY, day);
};

export const toggleNotificationDialog = ({ commit }) => {
  commit(types.TOGGLE_NOTIFICATION_DIALOG);
};
export const notify = ({ commit }, notification) => {
  const myNotification = new Notification("Title", {
    body: notification,
    icon: "/icon.png",
  });

  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
  // commit(types.SET_DAY, day);
};


export const toggleNewTaskDialog = ({ commit }) => {
  commit(types.TOGGLE_NEW_TASK_DIALOG);
};
export const toggleTaskStatus = ({ commit, state }, key) => {
  const obj = state.tasks.tasks.find(x => x.key === key);
  const index = state.tasks.tasks.indexOf(obj);
  commit(types.TOGGLE_TASK_STATUS, index);
};
export const createTask = ({ commit }, task) => {
  commit(types.CREATE_TASK, task);
};
export const removeTask = ({ commit, state }, key) => {
  const obj = state.tasks.tasks.find(x => x.key === key);
  const index = state.tasks.tasks.indexOf(obj);
  commit(types.REMOVE_TASK, index);
};
