const Directives = {};
Directives.install = function install(Vue) {
  Vue.directive("rainbow", (el) => {
    const g = 0.618033988749895;
    const h = (Math.random() + g) * 360;
    const s = Math.floor(Math.random() * (60 - 50 + 1) + 50);
    const l = Math.floor(Math.random() * (60 - 50 + 1) + 50);
    el.style.color = `hsl(${h}, ${s}%, ${l}%)`;
  });

  Vue.directive("old-rainbow", (el) => {
    const h = Math.floor(Math.random() * (360 - 1 + 1) + 1);
    const s = Math.floor(Math.random() * (60 - 50 + 1) + 50);
    const l = Math.floor(Math.random() * (60 - 50 + 1) + 50);
    el.style.color = `hsl(${h}, ${s}%, ${l}%)`;
  });

  Vue.directive("modal", (el, binding) => {
    el.onclick = () => { $(".modal").modal(); $(binding.value).modal("open"); console.log(binding.value); };
  });

  Vue.directive("season-text", (el, data) => {
    switch (data.value) {
      case 11:
      case 0:
      case 1:
        el.style.color = "#2196F3";
        break;

      case 2:
      case 3:
      case 4:
        el.style.color = "#4CAF50";
        break;

      case 5:
      case 6:
      case 7:
        el.style.color = "#F44336";
        break;

      case 8:
      case 9:
      case 10:
        el.style.color = "#ff9800";
        break;
      default: break;
    }
  });
};

export default Directives;
