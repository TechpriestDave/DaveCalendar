<template lang="html">
  <div v-if="tasks.length > 0" class="task-category">
    <h2>Today</h2>
    <div v-for="task in tasks" class="task">
      <p>
       <input type="checkbox" class="filled-in" v-bind:id="task.key"/>
       <label v-bind:for="task.key">{{task.task}}</label>
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    tasks: function tasks() {
      return this.$store.state.todo.tasks.filter((task) => (moment(task.date).isBetween(moment().add(-1, "d"), moment().add(1, "d"))));
    },
  },
};
</script>

<style lang="scss">

</style>
