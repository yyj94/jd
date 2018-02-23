<template>
  <div class="tab bdr-b">
    <router-link tag="div" class="tab-item" to="/home"></router-link>
    <router-link tag="div" class="tab-item" to="/classify"></router-link>
    <router-link tag="div" class="tab-item" to="/explore"></router-link>
    <router-link tag="div" class="tab-item" to="/shoppingcart"></router-link>
    <router-link tag="div" class="tab-item" to="/user"></router-link>
    <span ref="number" class="number" v-if="cartNum">{{cartNum}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        count: 0
      }
    },
    computed: {
      cartNum() {
        this.count = 0
        this.cartProducts.forEach(({ quantity }) => {
          this.count += quantity
        })
        return this.count
      },
      ...mapGetters([
        'cartProducts'
      ])
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/function";
  @import "../../common/scss/mixin";

  .tab {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: size(100px);
    background: $color-background-d;
    .number {
      position: absolute;
      top: size(10px);
      right: 26%;
      padding: size(2px) size(6px);
      font-size: $font-size-small-s;
      color: $color-sub-theme;
      border: 1px solid $color-sub-theme;
      @include round-all(size(12px));
      z-index: 10;
      background: $color-background-d;
    }
    .tab-item {
      display: block;
      flex: 1;
      background-size: size(130px) size(100px);
      &:nth-child(1) {
        @include bg-image("icon_shouye");
        &.router-link-active {
          @include bg-image("icon_shouye_r");
        }
      }
      &:nth-child(2) {
        @include bg-image("icon_fenlei");
        &.router-link-active {
          @include bg-image("icon_fenlei_r");
        }
      }
      &:nth-child(3) {
        @include bg-image("icon_mime");
        &.router-link-active {
          @include bg-image("icon_mime_r");
        }
      }
      &:nth-child(4) {
        @include bg-image("icon_shoppingcart");
        &.router-link-active {
          @include bg-image("icon_shoppingcart_r");
        }
      }
      &:nth-child(5) {
        @include bg-image("icon_wode");
        &.router-link-active {
          @include bg-image("icon_wode_r");
        }
      }
    }
  }
</style>
