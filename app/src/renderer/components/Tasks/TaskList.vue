<template lang="html">
  <div>
    <ul :category="category" v-for="(task, index) in tasks" class="tasklist" :key="task.key" :data-index="index">
      <li>
       <input type="checkbox" class="filled-in" v-on:click(toggleTask(task.key)) v-bind:id="task.key" :value="task.key" v-model="finishedTasks"/>
       <label v-bind:for="task.key">{{task.task}}</label>
       <i v-on:click="removeTask(task.key)" class="material-icons md-24">close</i>
     </li>
    </ul>
  </div>
</template>

<script>
import _ from "lodash";
import draggable from "vuedraggable";
export default {
  props: ["category"],
  data: () => ({
    finishedTasksTemp: [],
    finishedTasks: [],
    list: {
      get() {
        return this.$store.state.tasks.tasks;
      },
      set(task) {
        this.$store.commit("updateTasks", task);
      },
    },
  }),
  computed: {
    tasks: function tasks() {
      return this.$store.state.tasks.tasks.filter((task) => (task.category === this.category));
    },
  },
  created: function created() {
    // WARNING
    // I don't remember how this even works anymore so if this doesn't seem right it probably isn't.
    this.finishedTasksTemp = _.filter(this.$store.state.tasks.tasks.map(e => e.status === true ? e.key : null), e => _.isNumber(e));
    this.finishedTasks = _.filter(this.$store.state.tasks.tasks.map(e => e.status === true ? e.key : null), e => _.isNumber(e));

    console.log(this.$store.state.tasks.tasks);
  },
  methods: {
    removeTask(key) {
      this.$store.dispatch("removeTask", key);
    },
  },
  components: {
    draggable,
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
};
</script>

<style lang="scss">
  .task-category {
    margin-bottom: 44px;
    .tasklist {
      padding-left: 1em;

      li { margin: 14px 8px; }

      label {
        line-height: 18px;
        font-size: 20px;
        color: rgba(0,0,0, .87);
      }

      i {
        position: relative;
        height: 24px;
        width: 24px;
        top: 6px;
        padding-left: 12px;
        color: rgba(120,120,120, 0);
        transition: .3s ease;
        cursor: pointer;
      }
      &:hover i {
        color: rgba(120,120,120, .67);
      }
    }
  }
</style>
