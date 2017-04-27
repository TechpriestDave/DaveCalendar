<template lang="html">
  <transition name="task-dialog" mode="out-in">
    <div class="new-task-dialog">
      <h2>Create Task</h2>
      <i v-on:click="toggleNewTaskDialog" class="material-icons toggle-dialog">add</i>
      <div class="row">
        <div class="input-field col s8">
          <input v-model="category" id="category" type="text">
          <label class="white-text" for="category">Category</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s8">
          <input v-model="task" id="task" type="text">
          <label class="white-text" for="task">Task</label>
        </div>
      </div>
      <div class="button-container">
        <div v-on:click="createTask" class="btn-flat">
          <span class="white-text">Add</span>
        </div>
        <div v-on:click="toggleNewTaskDialog" class="btn-flat">
          <span class="white-text">Cancel</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    category: "",
    task: "",
  }),
  computed: {
    showNewTaskDialog: function showNewTaskDialog() {
      return this.$store.state.todo.showNewTaskDialog;
    },
  },
  mounted: function mounted() {
    $(".datepicker").pickadate();
  },
  methods: {
    toggleNewTaskDialog: function toggleTaskDialog() {
      this.$store.dispatch("toggleNewTaskDialog");
      $(".new-task-dialog").toggleClass("active");
    },
    createTask: function createTask() {
      if (this.category === "") {
        this.category = "No category";
      }
      const task = {
        key: parseInt(Math.random() * 10000000, 12),
        category: this.category,
        task: this.task,
        status: false,
      };
      this.$store.dispatch("createTask", task);
      this.$store.dispatch("toggleNewTaskDialog");
      $(".new-task-dialog").toggleClass("active");

      this.category = "";
      this.task = "";
      $("#date").val("");
    },
  },
};
</script>

<style lang="scss">
  .new-task-dialog {
    box-sizing: border-box;
    position: fixed;
    padding: 12px;
    height: 360px;
    width: 100%;
    left: 0;
    bottom: -290px;
    background-color: #f06292;
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
