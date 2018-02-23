<template>
  <div class="good-box">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/function";

  .good-box {
    position: relative;
    min-height: 1px;
    display: flex;
    .good-item {
      box-sizing: border-box;
      height: size(250px);
      padding: size(20px) size(20px) size(10px) size(20px);
      border: 1px solid $color-background-border;
      margin-right: -1px;
      margin-bottom: -1px;
      h1 {
        color: $color-text-d;
        font-size: $font-size-small;
      }
      h2 {
        margin-top: 0.2rem;
        color: $color-sub-theme;
        font-size: $font-size-small-s;
      }
      img {
        margin-top: 0.2rem;
        text-align: center;
      }
      &.half-item {
        flex: 50%;
        img {
          float: right;
          margin-left: size(20px);
          width: size(145px);
          height: size(145px);
        }
      }
      &.quarter-item {
        flex: 25%;
        img {
          width: size(145px);
          height: size(145px);
        }
      }
    }
  }
</style>
