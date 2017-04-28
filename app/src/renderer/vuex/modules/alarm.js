import * as types from "../mutation-types";

const state = {
  showDialog: false,
  tasks: [],
  list: [], // fs.readFileSync(path.join(app.getPath("userData"), "list.min.json")),
};

const mutations = {
  [types.CREATE_NOTIFICATION](state, task) {
    state.list.push(task);
  },
  [types.REMOVE_NOTIFICATION](state, index) {
    console.dir(state.accounts);
    state.accounts.splice(index, 1);
    localStorage.accounts = JSON.stringify(state.accounts);
  },
  [types.TOGGLE_NOTIFICATION_DIALOG](state) {
    state.showDialog = !state.showDialog;
  },
};

export default {
  state,
  mutations,
};
