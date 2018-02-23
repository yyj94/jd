<template>
  <transition :name="direction" mode="out-in">
    <div class="good-detail" ref="page">
      <div class="header">
        <div class="header-l" @click="back">
          <i class="icon-head-left"></i>
        </div>
        <div class="header-m">
          <div class="item-m active">
            <span>商品</span>
          </div>
          <div class="item-m">
            <span>详情</span>
          </div>
          <div class="item-m">
            <span>评价</span>
          </div>
        </div>
        <div class="header-r">
          <div class="item-r">
            <i class="icon-share"></i>
          </div>
          <div class="item-r">
            <i class="icon-ellipsis"></i>
          </div>
        </div>
      </div>
      <div class="content">
        <transition name="component-slide" mode="out-in">
          <component :is="view" :good="good" @open="showPickTab"></component>
        </transition>
      </div>
      <div class="tab">
        <div class="tab-l">
          <div class="operate">
            <div class="tab-item">
              <i class="icon-supply"></i>
              <span>供应商</span>
            </div>
            <div class="tab-item">
              <i class="icon-shop"></i>
              <span>店铺</span>
            </div>
            <div class="tab-item">
              <i class="icon-follow"></i>
              <span>关注</span>
            </div>
            <div class="tab-item" @click="toCart">
              <i class="icon-shoppingcart">
                <span ref="number" class="number" v-if="cartNum">{{cartNum}}</span>
              </i>
              <span>购物车</span>
            </div>
          </div>
        </div>
        <div class="tab-r">
          <div class="button" @click="showConfirmPickTab">
            <span class="add">
            加入购物车
            </span>
          </div>
        </div>
      </div>
      <transition name="mask">
        <div @click="hidePickTab" v-show="maskover" ref="mask" class="mask"></div>
      </transition>
      <transition name="slide-y">
        <div v-show="open" class="extend-tab">
          <pick-tab @close="hidePickTab"
                    :good="good"
                    :changeText="changeText">
          </pick-tab>
        </div>
      </transition>
      <div class="loading-container" v-show="!good">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Good from 'components/good-tab/good'
  /* import Detail from 'components/good-tab/detail'
  import Apprasie from 'components/good-tab/appraise' */
  import PickTab from 'components/pick-tab/pick-tab'
  import {mapGetters} from 'vuex'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        view: 'v-a',
        open: false,
        maskover: false,
        changeText: '加入购物车',
        count: 0,
        direction: 'slide-right'
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
        'good',
        'cartProducts'
      ])
    },
    methods: {
      back() {
        this.direction = 'slide-right'
        setTimeout(() => {
          this.$router.go(-1)
        }, 10)
      },
      toCart() {
        this.direction = 'slide-left'
        setTimeout(() => {
          this.$router.push(this.$route.path + '/cartlist')
        }, 10)
      },
      showPickTab() {
        this.open = true
        this.maskover = true
      },
      showConfirmPickTab() {
        this.open = true
        this.maskover = true
        this.changeText = '确定'
      },
      hidePickTab(isAdd) {
        this.open = false
        this.maskover = false
        this.changeText = '加入购物车'
        if (isAdd === 'add') {
          setTimeout(() => {
            this.$refs.number.style.transform = `scale(1.2)`
          }, 450)
          setTimeout(() => {
            this.$refs.number.style.transform = ``
          }, 700)
        }
      }
    },
    components: {
      'v-a': Good,
      PickTab,
      Loading
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/function";
  @import "../../common/scss/mixin";

  .good-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background-d;
    z-index: 30;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: size(100px);
      color: $color-text-d;
      border-bottom: 1px solid $color-border;
      .header-l {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
        top: 0;
        width: 10%;
        height: 100%;
        font-size: $font-size-large;
      }
      .header-m {
        height: size(100px);
        margin: 0 auto;
        width: 45%;
        height: 100%;
        font-size: 0;
        display: flex;
        .item-m {
          flex: 1;
          margin: 0 size(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: $font-size-small-x;
          &.active {
            height: size(97px);
            border-bottom: size(3px) solid $color-text-d;
            span {
              transform: scale(1.2);
            }
          }
        }
      }
      .header-r {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 20%;
        display: flex;
        font-size: $font-size-large;
        .item-r {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      i {
        position: relative;
        top: size(5px);
      }
    }
    .content {
      position: fixed;
      top: size(100px);
      width: 100%;
      bottom: size(110px);
    }
    .tab {
      position: fixed;
      bottom: 0;
      left: 0;
      height: size(110px);
      width: 100%;
      font-size: 0;
      border-top: 1px solid $color-border;
      overflow: hidden;
      .tab-l {
        float: left;
        width: 60%;
        height: 100%;
        .operate {
          display: flex;
          width: 100%;
          height: 100%;
          .tab-item {
            flex: 1;
            display: flex;
            box-sizing: border-box;
            height: 100%;
            padding: size(14px) 0;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            color: $color-text;
            i {
              font-size: $font-size-large-x;
            }
            span {
              font-size: $font-size-small-s;
            }
            .icon-supply {
              position: relative;
              top: size(4px);
            }
            .icon-follow {
              position: relative;
              top: size(5px);
            }
            .icon-shoppingcart {
              position: relative;
              top: size(4px);
              left: size(-2px);
              .number {
                position: absolute;
                top: size(-3px);
                right: size(-20px);
                padding: size(2px) size(6px);
                font-size: $font-size-small-s;
                color: $color-sub-theme;
                border: 1px solid $color-sub-theme;
                @include round-all(size(12px));
                z-index: 10;
                background: $color-background-d;
              }
            }
          }
        }
      }
      .tab-r {
        float: right;
        width: 40%;
        height: 100%;
        .button {
          width: 100%;
          height: 100%;
          font-size: $font-size-medium;
          display: flex;
          align-items: center;
          justify-content: center;
          background: $color-sub-theme;
          .add {
            color: $color-text-ll;
          }
        }
      }
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.6;
    }
    .extend-tab {
      position: fixed;
      left: 0;
      bottom: 0;
      height: size(800px);
      width: 100%;
      background-color: $color-background-d;
      z-index: 50;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .slide-y-enter-active, .slide-y-leave-active {
    transition: all 0.6s;
  }

  .slide-y-enter, .slide-y-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  .mask-enter-active, .mask-leave-active {
    transition: all 0.4s
  }

  .mask-enter, .mask-leave-to {
    opacity: 0;
  }
</style>
