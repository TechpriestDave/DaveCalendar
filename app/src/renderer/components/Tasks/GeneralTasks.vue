<template lang="html">
  <div v-if="$store.state.todo.tasks.length != 0"class="task-category">
    <h1>Tasks</h1>
    <transition-group
      appear
      name="slide-right"
      v-bind:css="false"
      v-on:before-enter="beforeEnterRight"
      v-on:enter="enter"
      v-on:leave="leaveRight"
      >
      <div v-for="(task, index) in generalTasks" class="task" :key="task.key" :data-index="index">
        <p>
         <input type="checkbox" class="filled-in" v-on:click(toggleTask(task.key)) v-bind:id="task.key" :value="task.key" v-model="finishedTasks"/>
         <label v-bind:for="task.key">{{task.task}}</label>
         <i v-on:click="removeTask(task.key)" class="material-icons md-24">close</i>
        </p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
export default {
  data: () => ({
    finishedTasks: [],
    finishedTasksTemp: [],
  }),
  computed: {
    generalTasks: function generalTasks() {
      return this.$store.state.todo.tasks.filter((task) => (!moment(task.date).isValid()));
    },
  },
  created: function created() {
    this.finishedTasksTemp = _.filter(this.$store.state.todo.tasks.map(e => e.status === true ? e.key : null), e => _.isNumber(e));
    this.finishedTasks = _.filter(this.$store.state.todo.tasks.map(e => e.status === true ? e.key : null), e => _.isNumber(e));
  },
  watch: {
    finishedTasks: function finishedTasks() {
      let key;
      if (this.finishedTasks !== this.finishedTasksTemp) {
        if (this.finishedTasks.length > this.finishedTasksTemp.length) {
          key = _.difference(this.finishedTasks, this.finishedTasksTemp);
        } else {
          key = _.difference(this.finishedTasksTemp, this.finishedTasks);
        }
        if (key[0]) {
          key = key[0];
          this.$store.dispatch("toggleTaskStatus", key);
          if (this.finishedTasksTemp.indexOf(key) === -1) {
            this.finishedTasksTemp.push(key);
          } else {
            this.finishedTasksTemp.splice(this.finishedTasksTemp.indexOf(key), 1);
          }
        }
      }
    },
  },
  methods: {
    removeTask(key) {
      this.$store.dispatch("removeTask", key);
    },
    beforeEnterRight(el) {
      el.style.transform = "translateX(110%)";
    },
    enter(el, done) {
      const delay = el.dataset.index * 50;
      setTimeout(() => {
        Velocity(
          el,
          {
            transform: "translateX(0%)",
          },
          { complete: done },
        );
      }, delay);
    },
    leaveRight(el, done) {
      const delay = el.dataset.index * 50;
      setTimeout(() => {
        Velocity(
          el,
          { transform: "translateX(110%)" },
          { complete: done },
        );
      }, delay);
    },
  },
};
</script>

<style lang="scss">
</style>
