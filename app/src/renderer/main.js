import Vue from "vue";
import Electron from "vue-electron";
import Resource from "vue-resource";
import Router from "vue-router";

import App from "./App";
import routes from "./routes";

import Filters from "./plugins/filters";
import Directives from "./plugins/directives";

Vue.use(Electron);
Vue.use(Resource);
Vue.use(Router);
Vue.use(Filters);
Vue.use(Directives);
Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  // mode: "history",
  routes,
});

/* eslint-disable no-new */
new Vue({
  router,
  ...App,
}).$mount("#app");
