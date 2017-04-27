<template lang="html">
  <div class="splash-view">
    <div class="icon-container">
      <img class="splash-icon" src="../assets/icon.svg">
    </div>
    <h1>DaveCalendar</h1>
  </div>
</template>

<script>
export default {
  name: "splash",
};
</script>

<style lang="scss">
  .splash-view {
    .icon-container {
      position: absolute;
      width: 60%;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);

      .splash-icon {
        transform: scale(0);
        height: 100%;
        width: 100%;
        animation-name: splash;
        animation-duration: 1s;
        animation-delay: 1s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        transform-origin: center;
      }

      @keyframes splash {
        0% {
          transform: scale(0) rotate(80deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
    }

    h1 {
      position: absolute;
      margin: 0;
      top: 80%;
      left: 50%;
      transform: translateX(-50%);
      color: #f06292;
      font-size: 56px;
      font-weight: 200;
      filter: opacity(0);

      animation-name: text;
      animation-duration: 1s;
      animation-delay: 1s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      transform-origin: center;
    }

    @keyframes text {
      0% {
        top: 80%;
        transform: translateX(-50%);
        filter: opacity(0);
      }
      100% {
        top: 65%;
        transform: translateX(-50%);
        filter: opacity(1);
      }
    }
  }
</style>
