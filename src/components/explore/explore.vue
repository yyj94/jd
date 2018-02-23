<template>
  <div>
    即将跳转至炸鸡音乐页面。。。
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      setTimeout(() => {
        window.location.href = `http://www.giftogether.win/vue-music/`
      }, 1000)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";

  div {
    text-align: center;
    margin-top: size(300px);
    color: $color-sub-theme;
    font-size: $font-size-large;
  }
</style>
