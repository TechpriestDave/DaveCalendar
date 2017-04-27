import * as types from "../mutation-types";
const app = require("electron").remote.app;
const fs = require("fs");
const path = require("path");


const state = {
  showNewTaskDialog: false,
  tasks: JSON.parse(fs.readFileSync(path.join(app.getPath("userData"), "tasks.min.json"))),
};

const mutations = {
  [types.CREATE_TASK](state, task) {
    state.tasks.push(task);
    fs.writeFile(path.join(app.getPath("userData"), "tasks.min.json"), JSON.stringify(state.tasks));
  },
  [types.REMOVE_TASK](state, index) {
    state.tasks.splice(index, 1);
    fs.writeFile(path.join(app.getPath("userData"), "tasks.min.json"), JSON.stringify(state.tasks));
  },
  [types.TOGGLE_TASK_STATUS](state, index) {
    state.tasks[index].status = !state.tasks[index].status;
    fs.writeFile(path.join(app.getPath("userData"), "tasks.min.json"), JSON.stringify(state.tasks));
  },
  [types.TOGGLE_NEW_TASK_DIALOG](state) {
    state.showNewTaskDialog = !state.showNewTaskDialog;
  },
};

export default {
  state,
  mutations,
};
