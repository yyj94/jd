<template>
  <transition :name="direction" mode="out-in">
    <div class="good-list">
      <div class="filter-secondary-copy" v-show="scrollPos">
        <div class="item-secondary">
          <span>京东配送</span>
        </div>
        <div class="item-secondary short">
          <span>品牌</span>
          <i class="icon-caret-bottom"></i>
        </div>
        <div class="item-secondary">
        <span>
          前置摄像头像素
        </span>
          <i class="icon-caret-bottom"></i>
        </div>
        <div class="item-secondary">
        <span>
          后置摄像头像素
        </span>
          <i class="icon-caret-bottom"></i>
        </div>
      </div>
      <scroll class="list"
              @scroll="scroll"
              :probe-type="probeType"
              :listen-scroll="listenScroll"
              :data="goods"
              ref="list">
        <div>
          <div class="header" ref="header">
            <div class="header-left" @click="back">
              <i class="icon-head-left"></i>
            </div>
            <div class="header-search">
              <i class="icon-search"></i>
              <input type="text" placeholder="刷新页面更换占位符">
              <img class="logo-robot" src="../../common/images/logo_robot.png" alt="xiaodong">
            </div>
            <div class="header-right">
              <i class="icon-app"></i>
            </div>
          </div>
          <div class="filter-primary" ref="primary">
            <div class="item-primary">
              <span>综合</span>
              <i class="icon-caret-bottom"></i>
            </div>
            <div class="item-primary">销量</div>
            <div class="item-primary">
              <span>价格</span>
              <span class="column">
          <i class="icon-caret-top"></i>
          <i class="icon-caret-bottom"></i>
        </span>
            </div>
            <div class="item-primary active">
              <span>筛选</span>
              <i class="icon-filter"></i>
            </div>
          </div>
          <div class="filter-secondary" ref="secondary">
            <div class="item-secondary">
              <span>京东配送</span>
            </div>
            <div class="item-secondary short">
              <span>品牌</span>
              <i class="icon-caret-bottom"></i>
            </div>
            <div class="item-secondary">
        <span>
          前置摄像头像素
        </span>
              <i class="icon-caret-bottom"></i>
            </div>
            <div class="item-secondary">
        <span>
          后置摄像头像素
        </span>
              <i class="icon-caret-bottom"></i>
            </div>
          </div>
          <div class="product-list-wrapper">
            <product-list :lists="goods"                                               @select="selectGood">
            </product-list>
          </div>
        </div>
        <div class="loading-container" v-show="!goods.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getDatas} from 'api/getDatas'
  import ProductList from 'base/product-list/product-list'
  import Scroll from 'base/scroll/scroll'
  import {mapMutations, mapGetters} from 'vuex'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        goods: [],
        scrollY: 0,
        scrollPos: false,
        direction: 'slide-right'
      }
    },
    computed: {
      ...mapGetters([
        'classify'
      ])
    },
    created() {
      this._getDetail()
      this.$store.dispatch('getAllProducts')
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.headerHeight = this.$refs.header.clientHeight
      this.primaryHeight = this.$refs.primary.clientHeight
      this.minTranslateY = -(this.headerHeight + this.primaryHeight)
    },
    methods: {
      _getDetail() {
        let self = this
        if (!this.classify.id) {
          this.$router.push('/classify')
          return
        }
        getDatas().then((res) => {
          if (res.errno === 0) {
            self.goods = res.data.classList[0].wrapper2.items[0].list
          }
        })
      },
      back() {
        this.direction = 'slide-right'
        setTimeout(() => {
          this.$router.go(-1)
        })
      },
      selectGood(product) {
        this.direction = 'slide-left'
        setTimeout(() => {
          this.$router.push({
            path: `/good/${product.class}/${product.nid}`
          })
          this.setGood(product)
          // 每次点击商品，重置商品选择和数量, 设置一个时间戳
          let arr = []
          for (let i = 0; i < product.pickList.length; i++) {
            let child = product.pickList[i]
            arr.push(child.default)
          }
          this.setPickItems(arr)
          this.setBuyNum(1)
          let now = +new Date()
          this.setTime(now)
        }, 10)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      ...mapMutations({
        setGood: 'SET_GOOD',
        setBuyNum: 'SET_BUYNUM',
        setPickItems: 'SET_PICKITEMS',
        setTime: 'SET_TIME'
      })
    },
    watch: {
      scrollY(newY) {
        if (newY < this.minTranslateY) {
          this.scrollPos = true
        } else {
          this.scrollPos = false
        }
      }
    },
    components: {
      ProductList,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/function";
  @import "../../common/scss/mixin";

  .good-list {
    background: $color-background;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    .filter-secondary-copy {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      padding: size(13px);
      box-sizing: border-box;
      width: 100%;
      height: size(80px);
      background: $color-background-d;
      border-bottom: 1px solid $color-border;
      z-index: 40;
      .item-secondary {
        margin: 0 size(13px);
        position: relative;
        box-sizing: border-box;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0;
        overflow: hidden;
        background: $color-background;
        @include round-all(size(5px));
        span {
          display: inline-block;
          flex: 1;
          text-align: right;
          max-width: 68%;
          font-size: $font-size-small;
          color: $color-text-d;
          @include no-wrap;
        }
        i {
          display: inline-block;
          flex: 0 0 12%;
          font-size: size(20px);
        }
        &.short {
          span {
            diplay: inline-block;
            flex: auto;
          }
          i {
            display: inline-block;
            flex: auto;
          }
        }
      }
    }
    .list {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: $color-background-d;
      .header {
        display: flex;
        position: relative;
        width: 100%;
        height: size(100px);
        align-items: center;
        background: $color-background-d;
        .header-left {
          flex: 12%;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-head-left {
            color: $color-text-d;
            font-size: $font-size-large;
          }
        }
        .header-search {
          position: relative;
          flex: 76%;
          height: size(68px);
          font-size: 0;
          input {
            box-sizing: border-box;
            width: 100%;
            height: size(68px);
            padding: 0 13%;
            color: $color-text-l;
            font-size: $font-size-small;
            background: $color-background;
            border-color: transparent;
            @include round-all(size(60px));
          }
          .icon-search {
            position: absolute;
            top: 50%;
            left: size(25px);
            transform: translateY(-45%);
            color: $color-text;
            font-size: $font-size-medium;
          }
          .logo-robot {
            display: block;
            position: absolute;
            top: 50%;
            right: size(25px);
            transform: translateY(-50%);
            width: $font-size-large;
            height: $font-size-large;
          }
        }
        .header-right {
          flex: 12%;
          font-size: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-app {
            color: $color-text-d;
            font-size: $font-size-large;
          }
        }
      }
      .filter-primary {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: size(80px);
        font-size: $font-size-medium;
        color: $color-text-d;
        background: $color-background-d;
        border: 1px solid $color-border;
        .item-primary {
          flex: 0 0 size(160px);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          &.active {
            color: $color-sub-theme;
          }
          .column {
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            .icon-caret-top {
              margin-left: size(4px);
              transform: translateY(20%);
            }
            .icon-caret-bottom {
              margin-left: size(4px);
              transform: translateY(-20%);
            }
          }
          i {
            font-size: size(20px);
            color: $color-text;
          }
          .icon-caret-bottom {
            margin-left: size(4px);
          }
          .icon-filter {
            font-size: size(30px);
            color: $color-sub-theme;
          }
        }
      }
      .filter-secondary {
        display: flex;
        position: relative;
        padding: size(13px);
        box-sizing: border-box;
        width: 100%;
        height: size(80px);
        background: $color-background-d;
        border-bottom: 1px solid $color-border;
        .item-secondary {
          margin: 0 size(13px);
          position: relative;
          box-sizing: border-box;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0;
          overflow: hidden;
          background: $color-background;
          @include round-all(size(5px));
          span {
            display: inline-block;
            flex: 1;
            text-align: right;
            max-width: 68%;
            font-size: $font-size-small;
            color: $color-text-d;
            @include no-wrap;
          }
          i {
            display: inline-block;
            flex: 0 0 12%;
            font-size: size(20px);
          }
          &.short {
            span {
              diplay: inline-block;
              flex: auto;
            }
            i {
              display: inline-block;
              flex: auto;
            }
          }
        }
      }
      .loading-container {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
