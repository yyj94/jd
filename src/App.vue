<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'

export default {
  components: {
    Tab
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .slide-left-enter-active, .slide-left-leave-active {
    transition: transform 0.4s;
  }
  .slide-left-enter, .slide-left-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-enter-active, .slide-right-leave-active {
    transition: transform 0.4s;
  }
  .slide-right-enter, .slide-right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
