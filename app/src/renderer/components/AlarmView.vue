<template lang="html">
  <div class="notification-view">
    <div class="notification-list">
      <div v-if="true" class="">

      </div>
      <div v-else class="empty">
        Create a new notification.
      </div>
    </div>
    <notification-dialog></notification-dialog>
  </div>
</template>

<script>
import NotificationDialog from "./Notifications/NotificationDialog";
export default {
  methods: {
    test: function test() {
      $(".tap-target").tapTarget("open");
    },
  },
  components: {
    NotificationDialog,
  },
};
</script>

<style lang="scss">
  .notification-view {
    .empty {
      position: absolute;
      top: 150px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 22px;
    }
    .notification-list {
      .notification-category {
        padding-bottom: 12px;

        .notification {
          padding-left: 1em;
          height: 18px;

          label {
            line-height: 18px;
            font-size: 20px;
            color: rgba(0,0,0, .87);
          }
        }
      }
    }
  }
</style>
