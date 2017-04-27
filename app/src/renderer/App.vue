<template>
  <div id="app">
    <frame></frame>
    <transition name="fade" mode="out-in" appear>
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  const { ipcRenderer } = require("electron");
  import Frame from "./components/Frame.vue";
  import store from "renderer/vuex/store";
  export default {
    store,
    components: {
      Frame,
    },
    created: function created() {
      window.addEventListener("keyup", this.handleKeyPress);
    },
    methods: {
      handleKeyPress: function handleKeyPress(e) {
        switch (e.keyCode) {
          case 123:
            ipcRenderer.send("action", { action: "toggleDevTools" });
            break;
          default: break;
        }
      },
    },
  };
</script>

<style lang="scss">
//  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  @import "globals";

  html, body, #app, .view {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  /*
  #app {
    border-radius: 10px;
    background: #FFF;
  }
  */

  .view {
    box-sizing: border-box;
    padding: 12px;
  }

  h1 {
    font-size: 32px;
    margin: .3em;
  }

  h2 {
    font-size: 26px;
    margin: .3em;
  }

  body {
    //font-family: Lato, sans-serif;
  }
</style>
