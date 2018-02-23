<template>
  <div class="good">
    <scroll class="scroll">
      <div>
        <div class="good-view"
             ref="goodView"
             @touchstart="ViewTouchStart"
             @touchmove="ViewTouchMove"
             @touchend="ViewTouchEnd">
          <div class="good-group" ref="goodGroup">
            <div data-index="index" v-for="(item, index) in good.picList">
              <img :src="item.picUrl">
            </div>
          </div>
          <div class="page-wrapper">
            <div class="page">
              <strong>{{currentIndex}}</strong><span>{{totalIndex}}</span>
            </div>
          </div>
        </div>
        <div class="good-content">
          <div class="good-head">
            <span class="tag" v-html="good.tag"></span>
            <span class="name" v-html="good.name"></span>
            <div class="text-row">
              <span v-html="good.txt.p"></span>
              <a href="good.txt.href" v-html="good.txt.a"></a>
            </div>
            <div class="price-row">
              <div class="price"><span class="price-int">{{format(good.price)[0]}}</span><span class="price-float">.{{format(good.price)[1]}}</span></div>
              <div class="info">降价通知</div>
            </div>
          </div>
          <div v-if="!login" class="bt-row bdr-b">
            <span class="row-l">白条</span>
            <span class="row-m">【白条支付】 首单立减5元</span>
            <i class="icon-ellipsis"></i>
          </div>
          <div class="change-row">
            <div class="col1">
              <span>促销</span>
            </div>
            <div class="col2" ref="change">
              <div v-if="changeList.length" class="item" v-for="item in changeList">
                <span class="tag" v-html="item.tag"></span>
                <span class="text" v-html="item.txt"></span>
              </div>
              <i class="icon-ellipsis"></i>
              <div v-if="tagList.length" class="extend">
                <span class="tag" v-for="item in tagList" v-html="item.tag"></span>
              </div>
            </div>
          </div>
          <div class="exchange-row">
            <div class="row-l">
              <i class="icon-exchange"></i>
              <span class="black">以旧换新</span>
              <span class="small">闲置回收</span>
            </div>
            <div class="row-r">
              <i class="icon-head-right"></i>
            </div>
          </div>
        </div>
        <div class="divided-bg"></div>
        <div class="pick-row" @click="showPickTab()">
          <span>已选</span>
          <span class="pick-item">
          {{pickText}}
        </span>
          <i class="icon-ellipsis"></i>
        </div>
        <div class="divided-bg"></div>
        <div class="address-row">
          <div class="content-row">
            <div class="locate-row">
              <div class="row-l">
                <span>送至</span>
              </div>
              <div class="row-r">
                <div class="locate-view">
                  <i class="icon-locate"></i>
                  <span>{{baiduLocate}}</span>
                </div>
                <div class="info">
                <span v-if="good.inventory" class="current">
                  现货<span v-if="today">， 11:00前下单，预计今天({{dispatchTime()}})送达</span><span v-else>， 23:00前下单，预计明天({{dispatchTime()}})送达</span>
                </span>
                  <span class="pend" v-else>暂无现货, 正在补货</span>
                </div>
              </div>
              <i class="icon-ellipsis"></i>
            </div>
            <div class="weight-row">
              <span class="row-l">重量</span>
              <span class="text" v-html="good.weight"></span>
            </div>
          </div>
          <div class="tag-row">
            <div class="tag" v-for="item in good.tagList">
              <i class="icon-info-check"></i>
              <span v-html="item"></span>
            </div>
          </div>
        </div>
        <div class="divided-bg"></div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDateStr} from 'common/js/dom'
  import {mapGetters} from 'vuex'
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        currentIndex: 1,
        totalIndex: 0,
        login: false,
        changeList: [],
        tagList: [],
        today: false,
        baiduLocate: '湖北省>仙桃市>龙华山街道办'
      }
    },
    computed: {
      pickText() {
        return this.pickItems[0] + '，' + this.pickItems[1] + '，' + this.buyNum + '件'
      },
      ...mapGetters([
        'pickItems',
        'buyNum'
      ])
    },
    props: {
      good: {
        type: Object,
        default: {}
      }
    },
    created() {
      this.touch = {}
      this.normalizeChange()
      this._browserLocation()
    },
    mounted() {
      setTimeout(() => {
        this.initWrapperWidth()
      }, 20)
    },
    methods: {
      showPickTab() {
        this.$emit('open')
      },
      normalizeChange() {
        let list = this.good.change
        if (list.length > 3) {
          this.changeList = list.slice(0, 2)
          this.tagList = list.slice(2, this.good.change.length)
        }
      },
      initWrapperWidth() {
        let width = 0
        let screenWidth = this.$refs.goodView.clientWidth
        this.children = this.$refs.goodGroup.children
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          width += screenWidth
          child.classList.add('good-item')
          this.totalIndex += 1
        }
        this.touch.maxOffsetWidth = width
        this.$refs.goodGroup.style.width = width + 'px'
      },
      ViewTouchStart(e) {
        this.touch.initialted = true
        let touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      ViewTouchMove(e) {
        if (!this.touch.initialted) {
          return
        }
        let left
        let touch = e.touches[0]
        let detalX = touch.pageX - this.touch.startX
        let detalY = touch.pageY - this.touch.startY
        if (Math.abs(detalY) - Math.abs(detalX) > 0) {
          return
        }
        if (this.touch.left) {
          left = this.touch.left
        } else {
          left = 0
        }
        let maxLeft = -(this.touch.maxOffsetWidth - window.innerWidth)
        let offsetWidth = Math.min(0, Math.max(maxLeft, detalX + left))
        this.touch.left = left
        this.touch.maxLeft = maxLeft
        this.touch.percent = detalX / window.innerWidth
        this.$refs.goodGroup.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
      },
      ViewTouchEnd(e) {
        if (!this.touch.initialted) {
          return
        }
        let offsetWidth
        if (this.touch.percent < -0.5) {
          if (this.touch.left !== this.touch.maxLeft) {
            offsetWidth = this.touch.left - window.innerWidth
            this.currentIndex += 1
          } else {
            offsetWidth = this.touch.maxLeft
          }
        } else if (this.touch.percent > 0.5) {
          if (this.touch.left !== 0) {
            offsetWidth = this.touch.left + window.innerWidth
            this.currentIndex -= 1
          } else {
            offsetWidth = 0
          }
        } else {
          offsetWidth = this.touch.left
        }
        this.touch.left = offsetWidth
        this.$refs.goodGroup.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
        this.touch.initialted = false
      },
      format(num) {
        let n = num * 1000000 / 10000
        let str = n.toString()
        let len = str.length
        let intNum = str.substring(0, len - 2)
        let floatNum = str.substr(len - 2, 2)
        return [intNum, floatNum]
      },
      _formatDate(y, m, d) {
        let month, day
        if (m.toString().length < 2) {
          month = '0' + m.toString()
        } else {
          month = m.toString()
        }
        if (d.toString().length < 2) {
          day = '0' + d.toString()
        } else {
          day = d.toString()
        }
        return `${month}月${day}日`
      },
      dispatchTime() {
        let d = new Date()
        let hour = d.getHours()
        if (hour < 11) {
          this.today = true
          return getDateStr(0, this._formatDate)
        } else {
          this.today = false
          return getDateStr(1, this._formatDate)
        }
      },
      _browserLocation() {
        let geoc = new BMap.Geocoder()
        let geolocation = new BMap.Geolocation()
        let vm = this
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() === 0) {
            let point = new BMap.Point(r.point.lng, r.point.lat)
            geoc.getLocation(point, (rs) => {
              let addComp = rs.addressComponents
              vm.baiduLocate = addComp.province + '>' + addComp.city + '>' + addComp.district
            })
          } else {
            vm.baiduLocate = 'error'
          }
        }, {enableHighAccuracy: true})
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/function";
  @import "../../common/scss/variable";
  @import "../../common/scss/mixin";

  .good {
    height: 100%;
    .scroll {
      height: 100%;
      overflow: hidden;
    }
    .good-view {
      position: relative;
      width: 100%;
      height: size(750px);
      overflow: hidden;
      &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        height: size(12px);
        width: 100%;
        background: linear-gradient($color-background-d, $color-background);
      }
      .good-group {
        height: size(750px);
        overflow: hidden;
        .good-item {
          float: left;
          font-size: 0;
          img {
            width: size(750px);
            height: size(750px);
          }
        }
      }
      .page-wrapper {
        position: absolute;
        bottom: size(20px);
        right: size(20px);
        width: size(90px);
        box-sizing: border-box;
        border-radius: size(90px);
        padding: size(20px);
        font-size: $font-size-medium-x;
        color: $color-text-ll;
        background: $color-dialog-background;
        .page {
          line-height: 1.2em;
          strong {
            padding-right: size(5px);
            font-weight: 400;
          }
          span {
            font-size: $font-size-small-s;
            padding-left: size(5px);
            &:before {
              position: relative;
              content: '/';
              left: -5px;
            }
          }
        }
      }
    }
    .good-content {
      min-height: 1px;
      .good-head {
        width: 100%;
        box-sizing: border-box;
        padding: size(25px) size(20px);
        line-height: 0.4rem;
        font-size: 0;
        border-bottom: 1px solid $color-border;
        .tag {
          font-size: $font-size-small-s;
          padding: 0 size(5px);
          margin-right: 0.2rem;
          color: $color-text-ll;
          background: $color-sub-theme;
          vertical-align: top;
        }
        .name {
          color: $color-text-d;
          font-size: $font-size-small-x;
        }
        .text-row {
          font-size: $font-size-small;
          color: $color-sub-theme;
          line-height: 0.5rem;
          margin-top: 0.2rem;
          a {
            color: $color-sub-theme;
            text-decoration: underline;
          }
        }
        .price-row {
          width: 100%;
          margin-top: 0.3rem;
          height: size(50px);
          overflow: hidden;
          .price {
            float: left;
            height: size(50px);
            line-height: size(50px);
            font-size: $font-size-large;
            color: $color-sub-theme;
            font-weight: 400;
            &:before {
              position: relative;
              left: size(-5px);
              content: "￥";
              font-size: $font-size-medium;
            }
            .price-float {
              font-size: $font-size-medium;
              font-weight: 400;
            }
          }
          .info {
            float: right;
            box-sizing: border-box;
            padding: size(10px) size(20px);
            height: size(50px);
            font-size: $font-size-small;
            border: 1px solid $color-border;
            @include round-all(size(10px));
          }
        }
      }
      .bt-row {
        width: 100%;
        position: relative;
        height: size(110px);
        box-sizing: border-box;
        padding: 0 size(20px);
        line-height: size(110px);
        overflow: hidden;
        font-size: $font-size-small;
        .row-l {
          float: left;
          height: size(110px);
        }
        .row-m {
          float: left;
          height: size(110px);
          margin-left: size(35px);
          color: $color-text-d;
        }
        .icon-ellipsis {
          float: right;
          height: size(110px);
          font-size: $font-size-large;
          line-height: size(110px);
        }
      }
      .change-row {
        width: 100%;
        position: relative;
        min-height: 1px;
        box-sizing: border-box;
        padding: size(30px) size(20px);
        overflow: hidden;
        font-size: $font-size-small;
        border: 1px solid $color-border;
        .col1 {
          float: left;
          width: 10%;
          height: 100%;
          position: relative;
          top: size(13px);
        }
        .col2 {
          float: left;
          width: 90%;
          position: relative;
          .item {
            height: size(50px);
            font-size: 0;
            width: 100%;
            display: flex;
            align-items: center;
            .tag {
              padding: size(3px) size(3px);
              font-size: $font-size-small;
              color: $color-sub-theme;
              border: 1px solid $color-sub-theme;
            }
            .text {
              flex: 1;
              margin-left: size(20px);
              color: $color-text-d;
              font-size: $font-size-small;
              @include no-wrap;
            }
          }
          .icon-ellipsis {
            position: absolute;
            top: size(4px);
            right: 0;
            z-index: 100;
            font-size: $font-size-large;
          }
          .extend {
            width: 100%;
            height: size(50px);
            display: flex;
            align-items: center;
            .tag {
              margin-right: size(20px);
              padding: size(3px) size(3px);
              font-size: $font-size-small;
              color: $color-sub-theme;
              border: 1px solid $color-sub-theme;
            }
          }
        }
      }
      .exchange-row {
        width: 100%;
        position: relative;
        height: size(101px);
        box-sizing: border-box;
        padding: 0 size(20px);
        overflow: hidden;
        .row-l {
          float: left;
          height: size(100px);
          line-height: size(100px);
          font-size: 0;
          color: $color-text-d;
          .icon-exchange {
            padding: 0 size(5px);
            margin-right: size(20px);
            font-size: $font-size-medium;
          }
          .black {
            margin-right: size(20px);
            font-size: $font-size-small;
          }
          .small {
            color: $color-text;
            font-size: $font-size-small-m;
          }
        }
        .row-r {
          float: right;
          height: size(100px);
          line-height: size(100px);
          font-size: $font-size-medium;
        }
      }
    }
    .divided-bg {
      height: size(25px);
      width: 100%;
      background: $color-border;
    }
    .pick-row {
      width: 100%;
      height: size(90px);
      line-height: size(90px);
      box-sizing: border-box;
      font-size: 0;
      position: relative;
      padding: 0 size(20px);
      span {
        font-size: $font-size-small;
        margin-right: size(20px);
        &.pick-item {
          color: $color-text-d;
          font-size: $font-size-small-x;
        }
      }
      .icon-ellipsis {
        position: absolute;
        font-size: $font-size-large;
        top: size(25px);
        right: size(20px);
      }
    }
    .address-row {
      width: 100%;
      min-height: 1px;
      .content-row {
        box-sizing: border-box;
        padding: size(30px) size(20px) size(20px);
        .locate-row {
          position: relative;
          display: flex;
          width: 100%;
          .row-l {
            font-size: $font-size-small;
            margin-right: size(20px);
          }
          .row-r {
            flex: 1;
            font-size: $font-size-small;
            .locate-view {
              width: 100%;
              margin-bottom: size(20px);
              i {
                color: $color-sub-theme;
                vertical-align: top;
              }
              span {
                color: $color-text-d;
              }
            }
            .info {
              width: 100%;
              .current {
                color: $color-sub-theme;
                span {
                  color: $color-text;
                }
              }
            }
          }
          .icon-ellipsis {
            position: absolute;
            top: size(-5px);
            right: 0;
            z-index: 100;
            font-size: $font-size-large;
          }
        }
        .weight-row {
          margin-top: size(20px);
          height: size(28px);
          width: 100%;
          font-size: $font-size-small;
          overflow: hidden;
          .row-l {
            float: left;
            margin-right: size(20px);
          }
          .text {
            float: left;
            color: $color-text-d;
          }
        }
      }
      .tag-row {
        box-sizing: border-box;
        padding: size(10px) size(20px);
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        background: $color-background;
        .tag {
          font-size: 0;
          height: size(35px);
          i {
            line-height: size(35px);
            padding-right: size(3px);
            color: $color-sub-theme;
            font-size: $font-size-small;
          }
          span {
            line-height: size(35px);
            color: $color-text-l;
            font-size: $font-size-small-m;
            margin-right: size(32px);
          }
        }
      }
    }
  }
</style>
