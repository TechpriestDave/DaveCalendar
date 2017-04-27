const Filters = {};
Filters.install = function install(Vue) {
  Vue.filter("toDate", date => new Date(date).toDateString());
  Vue.filter("toTime", date => new Date(date).toTimeString());
  Vue.filter("capitalize", string => string.charAt(0).toUpperCase() + string.slice(1));
  Vue.filter("redact", (string, length) => string.length > length ? `${string.substr(0, length)}...` : string);
};

export default Filters;
