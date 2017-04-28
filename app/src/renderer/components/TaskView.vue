<template lang="html">
  <div class="task-view">
    <div v-for="category in categories" class="task-category">
      <h2>{{category}}</h2>
      <task-list :category="category"></task-list>
    </div>
    <new-task-dialog></new-task-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import TaskList from "./Tasks/TaskList";
import NewTaskDialog from "./Tasks/NewTaskDialog";
export default {
  data: () => ({
    showTaskDialog: false,
  }),
  mounted: function mounted() {

  },
  computed: {
    showNewTaskDialog: function showNewTaskDialog() {
      return this.$store.state.tasks.showNewTaskDialog;
    },
    categories: function categories() {
      return _.compact(_.uniq(_.map(this.$store.state.tasks.tasks, e => (e.category))));
    },
  },
  components: {
    NewTaskDialog,
    TaskList,
  },
};
</script>

<style lang="scss">
  .task-view {
    .empty {
      position: absolute;
      top: 150px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 22px;
    }
  }
</style>
