<template lang="html">
  <div class="frame">
      <div class="nav-menu tabs">
        <li class="tab" v-on:click="moveIndicator(1)"><router-link to="/calendar">Calendar</router-link></li>
        <!--<li class="tab" v-on:click="moveIndicator(2)"><router-link to="/notifications">Notifications</router-link></li>-->
        <li class="tab" v-on:click="moveIndicator(2)"><router-link to="/alarm">Alarm</router-link></li>
        <li class="tab" v-on:click="moveIndicator(3)"><router-link to="/todo">Todo</router-link></li>
      </div>
    <div class="window-controls">
      <ul class="remove-list-style">
        <li v-on:click="exit" class="close"><i class="material-icons">close</i></li>
        <li v-on:click="minimize" class="minimize"><i class="material-icons">remove</i></li>
        <li class="toggle-maximize"><i class="material-icons">crop_square</i></li>

        <li class="toggle-fullscreen protected-id" id="fullscreen-window-control_unc2741">
          <i class="material-icons">fullscreen</i>
        </li>
        <li class="toggle-always-on-top protected-id" id="always-on-top-window-control_unc2741">
          <i class="material-icons">filter_tilt_shift</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
export default {
  mounted: function mounted() {
    $(".frame *").on("dragstart", (event) => { event.preventDefault(); });
    $(".nav-menu").append("<div class='indicator'></div>");
  },
  methods: {
    exit: function exit() {
      ipcRenderer.send("action", { action: "hide" });
    },
    minimize: function minimize() {
      ipcRenderer.send("action", { action: "minimize" });
    },
    moveIndicator: function moveIndicator(index) {
      const indicator = $(".indicator");
      indicator.velocity({ width: `${$(`.tab:nth-child(${index})`).width()}px` }, { duration: 300, queue: false, easing: "easeOutQuad" });
      indicator.velocity({ left: $(`.tab:nth-child(${index})`).position().left }, { duration: 300, queue: false, easing: "easeOutQuad" });
    },
  },
};
</script>

<style lang="scss">
.frame {
  position: relative;
  height: 77px;
  width: 100%;
  background-color: #FFF;
  // box-shadow: 4px 0px 4px 4px rgba(30, 30, 30, 0.3);
  -webkit-app-region: drag;
  ::selection {
    background-color: transparent;
  }

  .nav-menu {
    position: absolute;
    top: 29px;
    width: 96%;
    padding: 0 2%;
    overflow: hidden;

    .tab {
      -webkit-app-region: no-drag;
      cursor: pointer;
      a { color: #1F1A65; }
    }

    .indicator { background-color: #1F1A65; }
  }

  .window-controls {
    right: 0;
    width: 235px;

    li {
      position: absolute;
      text-align: center;
      outline: 0;
      color: #999999;
      -webkit-app-region: no-drag;
      cursor: default;

      top: 0;
      width: 45px;
      height: 29px;
      line-height: 35px;
      transition: color 0.2s, background-color 0.2s;

      &:hover { background-color: rgba(158, 158, 158, 0.2); }
      &:active { background-color: rgba(158, 158, 158, 0.4); }
    }

    .material-icons {
      font-size: 16px;
    }

    .close {
      right: 0;
      &:hover {
        color: white;
        background-color: #e81123;
      }
      &:active {
        color: white;
        background-color: #f1707a;
      }
    }

    .toggle-maximize {
      right: 45px;
      opacity: 0.3;
      pointer-events: none;
    }

    .minimize {
      right: 90px;
    }
    .toggle-fullscreen {
      right: 145px;
      color: black;
      display: none;
    }
    .toggle-always-on-top {
      right: 190px;
      color: black;
      display: none;
    }
  }




  .frame-buttons {
		float: right;
		box-sizing: border-box;
		height: 100%;
		padding-top: 4px;
		padding-right: 4px;
    -webkit-app-region: no-drag;

		div {
			float: left;
			height: 14px;
			width: 14px;
			margin: 6px;
			border-radius: 50%;
			transition: .1s linear;

			&[action="minimize"] {
				background-color: rgb(254, 197, 45);
			}
			&[action="maximize"] {
				background-color: rgb(40, 206, 66);
			}
			&[action="close"] {
				background-color: rgb(241, 100, 87);
			}
      /*
			&[action="minimize"]:hover {
				background-color: #43a047;
			}
			&[action="maximize"]:hover {
				background-color: #ffeb3b;
			}
			&[action="close"]:hover {
				background-color: #e53935;
			}
      */
		}
	}
}
</style>
