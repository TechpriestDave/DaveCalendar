<template lang="html">
  <transition name="task-dialog" mode="out-in">
    <div class="new-task-dialog">
      <h2>Create Task</h2>
      <i v-on:click="toggleDialog" class="material-icons toggle-dialog">add</i>
      <div class="row">
        <div class="input-field col s8">
          <input v-model="task" id="task" type="text">
          <label class="white-text" for="task">Task</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s8">
          <input id="date" class="datepicker" type="date">
          <label class="white-text" for="date">Date</label>
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
    task: "",
  }),
  computed: {
    showDialog: function showDialog() {
      return this.$store.state.notifications.showDialog;
    },
  },
  mounted: function mounted() {
    $(".datepicker").pickadate();
  },
  methods: {
    toggleDialog: function toggleDialog() {
      this.$store.dispatch("toggleNotificationDialog");
      $(".new-notification-dialog").toggleClass("active");
    },
    createNotification: function createNotification() {
      const notification = {
        key: Math.random() * 100000000,
        task: this.task,
        date: new Date($("#date").val()),
      };
      this.$store.dispatch("createNotification", notification);
      this.$store.dispatch("toggleNotificationDialog");
      $(".new-notification-dialog").toggleClass("active");

      this.task = "";
      $("#date").val("");
    },
  },
};
</script>

<style lang="scss">
  .new-notification-dialog {
    box-sizing: border-box;
    position: fixed;
    padding: 12px;
    height: 360px;
    width: 100%;
    left: 0;
    bottom: -290px;
    background-color: #1976d2;
    color: #FFF;
    font-size: 16px;
    transition: .5s ease;
    box-shadow: inset 0 14px 10px -10px rgba(60, 60, 60, .3);

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
      }
    }

    .input-field input:focus + label {
      color: #FFF !important;
    }
    .row .input-field input:focus {
      border-bottom: 1px solid #FFF !important;
      box-shadow: 0 1px 0 0 #FFF !important
    }

    .square-button {
      position: relative;
      background: transparent;
      height: 48px;
      width: 48px;
      i {
        color: #FFF;
        font-size: 48px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
