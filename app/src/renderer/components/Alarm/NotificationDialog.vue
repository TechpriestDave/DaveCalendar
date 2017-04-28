<template lang="html">
  <transition name="task-dialog" mode="out-in">
    <div class="notification-dialog">
      <h2>Create Notification</h2>
      <i v-on:click="toggleDialog" class="material-icons toggle-dialog">add</i>
      <br>
      <div class="row">
        <div class="input-field col s8">
          <input v-model="notification" id="notification" type="text">
          <label class="white-text" for="notification">Notification</label>
        </div>
      </div>
      <div class="row">
        <div class="time-picker">

        </div>
      </div>
      <div class="button-container">
        <div v-on:click="createNotification" class="btn-flat">
          <span class="white-text">Add</span>
        </div>
        <div v-on:click="toggleDialog" class="btn-flat">
          <span class="white-text">Cancel</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    notification: "",
    time: "",
  }),
  computed: {
    showDialog: function showDialog() {
      return this.$store.state.notifications.showDialog;
    },
  },
  methods: {
    toggleDialog: function toggleDialog() {
      this.$store.dispatch("toggleNotificationDialog");
      $(".notification-dialog").toggleClass("active");
    },
    createNotification: function createNotification() {
      const notification = {
        key: Math.random() * 100000000,
        task: this.task,
        date: new Date($("#date").val()),
      };
      this.$store.dispatch("createNotification", notification);
      this.$store.dispatch("toggleNotificationDialog");
      $(".notification-dialog").toggleClass("active");

      this.task = "";
      $("#date").val("");
    },
  },
};
</script>

<style lang="scss">
  .notification-dialog {
    box-sizing: border-box;
    position: fixed;
    padding: 12px;
    height: 715px;
    width: 100%;
    left: 0;
    bottom: -645px;
    background-color: #1F1A65;
    color: #FFF;
    font-size: 16px;
    transition: .5s ease;
    box-shadow: inset 0 18px 10px -10px rgba(90, 90, 90, .3);

    .toggle-dialog {
      position: absolute;
      top: 16px;
      right: 16px;
      transition: .3s ease;
      font-size: 36px;
      cursor: default;
    }

    &.active {
      bottom: 0px;
      .toggle-dialog {
        transform: rotate(45deg) scale(1.2);
        opacity: 0;
      }
    }

    .input-field input:focus + label {
      color: #FFF !important;
    }
    .row .input-field input:focus {
      border-bottom: 1px solid #FFF !important;
      box-shadow: 0 1px 0 0 #FFF !important
    }

    .input-field input + label {
      color: #FFF !important;
    }
    .row .input-field input {
      border-bottom: 1px solid #FFF !important;
      box-shadow: 0 1px 0 0 #FFF !important
    }

    .button-container {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 12px;
    }
  }
</style>
