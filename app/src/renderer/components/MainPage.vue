<template>
  <div class="main-page">
    <task-dialog></task-dialog>
    <NewTaskDialog v-if="showTaskDialog"></NewTaskDialog>
    <div v-on:click="toggleTaskDialog" class="btn-floating btn-large waves-effect waves-light new-task">
      <i class="material-icons">add</i>
    </div>
  </div>
</template>

<script>
import TaskList from "./TaskList";
import NewTaskDialog from "./NewTaskDialog";
export default {
  name: "main-page",
  components: {
    TaskList,
    NewTaskDialog,
  },
  methods: {
    toggleTaskDialog: function toggleTaskDialog() {
      $(".new-task").toggleClass("active");
      this.$store.dispatch("toggleTaskDialog");
    },
  },
};
</script>

<style lang="scss">
  .main-page {
    box-sizing: border-box;
    height: calc(100% - 29px);
    width: 100%;
    padding: 0 12px;

    .new-task {
      position: fixed;
      right: 12px;
      bottom: 12px;


      * {
        transition: .3s ease;
      }

      &.active {
        background-color: #FFF;

        i {
          transform: rotate(45deg);
          color: rgba(0,0,0,0.67);
          font-size: 32px;
        }
      }
    }
  }
</style>
