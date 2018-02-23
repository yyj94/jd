<template>
  <div class="home" ref="home">
    <div class="header" ref="header">
      <div class="header-scan" ref="scan">
        <i class="icon-scan"></i>
        <p class="text">扫啊扫</p>
      </div>
      <div class="header-search" ref="search">
        <i ref="icon" class="icon-search"></i>
        <input ref="input" type="text" placeholder="刷新页面更换占位符">
        <img class="logo-robot" src="../../common/images/logo_robot.png" alt="xiaodong">
      </div>
      <div class="header-news" ref="news">
        <i class="icon-news"></i>
        <p class="text">消息</p>
      </div>
    </div>
    <scroll ref="scroll"
            class="home-content"
            :data="tabList"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <div>
        <div class="content-wrapper">
          <div v-if="recommends.length"
               class="slider-wrapper"
               ref="sliderWrapper">
            <slider :refresh="refresh">
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img class="needsclick" @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
          <div class="nav-wrapper">
            <div class="nav"
                 ref="nav"
                 @touchstart="navTouchStart"
                 @touchmove="navTouchMove"
                 @touchend="navTouchEnd">
              <div class="nav-l">
                <div class="nav-item" v-for="item in navLeft">
                  <img :src="item.imgUrl">
                  <p v-html="item.txt"></p>
                </div>
              </div>
              <div class="nav-r">
                <div class="nav-item" v-for="item in navRight">
                  <img :src="item.imgUrl">
                  <p v-html="item.txt"></p>
                </div>
              </div>
            </div>
            <div class="dot-wrapper">
              <span class="dot" :class="{'active': currentShow === 'nav-l'}"></span>
              <span class="dot" :class="{'active': currentShow === 'nav-r'}"></span>
            </div>
            <div class="jd-news">
              <img src="../../common/images/logo_jdkb.png">
              <div v-if="news.length" class="slider-ad">
                <slider-y>
                  <div v-for="(item, index) in news">
                    <span class="highlight" v-html="item.key">爆 </span>
                    <span class="ad-text" v-html="item.txt"></span>
                  </div>
                </slider-y>
              </div>
              <span class="more">更多</span>
            </div>
          </div>
          <div class="jd-rush">
            <div class="rush-header">
              <div class="rush-left">
                <div class="title">
                  <i class="icon-clock"></i>
                  <h1>京东秒杀</h1>
                </div>
                <h2 class="etc" v-html="rush.etc"></h2>
                <div class="timer">
                    <span class="time" ref="hour"></span>:
                    <span class="time" ref="mini"></span>:
                    <span class="time" ref="sec"></span>
                </div>
              </div>
              <div class="rush-right">
                <h2>京东尖货轮番秒</h2>
                <i class="icon-caret-right-over"></i>
              </div>
            </div>
            <div class="slider-wrapper" v-if="rush.rushList">
              <slider-x>
                <div v-for="item in rush.rushList">
                  <img v-lazy="item.picUrl">
                  <p class="change" v-html="item.change"></p>
                  <p class="price" v-html="item.price"></p>
                </div>
              </slider-x>
            </div>
          </div>
          <div class="ad-first">
            <img :src="adfirst.picUrl">
          </div>
          <div class="good-wrapper">
            <box>
              <div class="good-item half-item">
                <h1 v-html="wrapper.wrapper1.tit"></h1>
                <h2 v-html="wrapper.wrapper1.sectit"></h2>
                <img v-lazy="wrapper.wrapper1.picUrl">
                <img v-lazy="wrapper.wrapper1.secpicUrl">
              </div>
              <div class="good-item quarter-item">
                <h1 v-html="wrapper.wrapper2.tit"></h1>
                <h2 v-html="wrapper.wrapper2.sectit"></h2>
                <img v-lazy="wrapper.wrapper2.picUrl">
              </div>
              <div class="good-item quarter-item">
                <h1 v-html="wrapper.wrapper3.tit"></h1>
                <h2 v-html="wrapper.wrapper3.sectit"></h2>
                <img v-lazy="wrapper.wrapper3.picUrl">
              </div>
            </box>
          </div>
          <div class="tab-wrapper" v-for="item in tabList">
            <div class="tab-tit">
              <img class="floor" src="../../common/images/floor-tit.png">
              <span class="img-tit">
              <img v-lazy="item.tit.picUrl">
              </span>
            </div>
            <div class="good-wrapper">
              <box>
                <div class="good-item half-item">
                  <h1 v-html="item.wrapper1.tit"></h1>
                  <h2 v-html="item.wrapper1.sectit"></h2>
                  <img v-lazy="item.wrapper1.picUrl">
                  <img v-lazy="item.wrapper1.secpicUrl">
                </div>
                <div class="good-item half-item">
                  <h1 v-html="item.wrapper2.tit"></h1>
                  <h2 v-html="item.wrapper2.sectit"></h2>
                  <img v-lazy="item.wrapper2.picUrl">
                  <img v-lazy="item.wrapper2.secpicUrl">
                </div>
              </box>
            </div>
            <div class="good-wrapper">
              <box>
                <div class="good-item half-item">
                  <h1 v-html="item.wrapper3.tit"></h1>
                  <h2 v-html="item.wrapper3.sectit"></h2>
                  <img v-lazy="item.wrapper3.picUrl">
                  <img v-lazy="item.wrapper3.secpicUrl">
                </div>
                <div class="good-item half-item">
                  <h1 v-html="item.wrapper4.tit"></h1>
                  <h2 v-html="item.wrapper4.sectit"></h2>
                  <img v-lazy="item.wrapper4.picUrl">
                  <img v-lazy="item.wrapper4.secpicUrl">
                </div>
              </box>
            </div>
            <div class="good-wrapper">
              <box>
                <div class="good-item quarter-item">
                  <h1 v-html="item.wrapper5.tit"></h1>
                  <h2 v-html="item.wrapper5.sectit"></h2>
                  <img v-lazy="item.wrapper5.picUrl">
                </div>
                <div class="good-item quarter-item">
                  <h1 v-html="item.wrapper6.tit"></h1>
                  <h2 v-html="item.wrapper6.sectit"></h2>
                  <img v-lazy="item.wrapper6.picUrl">
                </div>
                <div class="good-item quarter-item">
                  <h1 v-html="item.wrapper7.tit"></h1>
                  <h2 v-html="item.wrapper7.sectit"></h2>
                  <img v-lazy="item.wrapper7.picUrl">
                </div>
                <div class="good-item quarter-item">
                  <h1 v-html="item.wrapper8.tit"></h1>
                  <h2 v-html="item.wrapper8.sectit"></h2>
                  <img v-lazy="item.wrapper8.picUrl">
                </div>
              </box>
            </div>
          </div>
        </div>
      </div>
      <div class="loading-container" v-show="!tabList[0].wrapper8.picUrl">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDatas} from 'api/getDatas'
  import {prefixStyle} from 'common/js/dom'
  import Slider from 'base/slider/slider'
  import SliderY from 'base/slider/slider-y'
  import SliderX from 'base/slider/slider-x'
  import Box from 'components/good-box/good-box'
  import Scroll from 'base/scroll/scroll'
  import {fnTimeCountDown} from 'common/js/timeCountDown'
  import Loading from 'base/loading/loading'

  const transform = prefixStyle('transform')
  const SLIDE_HEIGHT = 340
  const HEAD_HEIGHT = 100

  export default {
    data() {
      return {
        navLeft: [
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_jdcs.png',
            txt: '京东超市'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_qqg.png',
            txt: '全球购'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_fzc.png',
            txt: '服装城'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_jdsx.png',
            txt: '京东生鲜'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_jddj.png',
            txt: '京东到家'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_czjf.png',
            txt: '充值缴费'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_ljd.png',
            txt: '领京豆'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_lj.png',
            txt: '券集市'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_hzq.png',
            txt: '惠赚钱'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_pluls.png',
            txt: 'PLUS会员'
          }

        ],
        navRight: [
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_pluls.png',
            txt: 'PLUS会员'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_qqg.png',
            txt: '全球购'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_fzc.png',
            txt: '服装城'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_jdsx.png',
            txt: '京东生鲜'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_jddj.png',
            txt: '京东到家'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_czjf.png',
            txt: '充值缴费'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_ljd.png',
            txt: '领京豆'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_lj.png',
            txt: '券集市'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_hzq.png',
            txt: '惠赚钱'
          },
          {
            imgUrl: 'http://www.yeyanjie.com/test/api/images/icon_jdcs.png',
            txt: '京东超市'
          }

        ],
        recommends: [],
        news: [],
        rush: {},
        adfirst: {},
        wrapper: {
          wrapper1: {
            tit: '',
            sectit: '',
            picUrl: '',
            secpicUrl: ''
          },
          wrapper2: {
            tit: '',
            sectit: '',
            picUrl: ''
          },
          wrapper3: {
            tit: '',
            sectit: '',
            picUrl: ''
          }
        },
        tabList: [
          {
            tit: {
              picUrl: ''
            },
            wrapper1: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper2: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper3: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper4: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper5: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper6: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper7: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper8: {
              tit: '',
              sectit: '',
              picUrl: ''
            }
          },
          {
            tit: {
              picUrl: ''
            },
            wrapper1: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper2: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper3: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper4: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper5: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper6: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper7: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper8: {
              tit: '',
              sectit: '',
              picUrl: ''
            }
          },
          {
            tit: {
              picUrl: ''
            },
            wrapper1: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper2: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper3: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper4: {
              tit: '',
              sectit: '',
              picUrl: '',
              secpicUrl: ''
            },
            wrapper5: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper6: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper7: {
              tit: '',
              sectit: '',
              picUrl: ''
            },
            wrapper8: {
              tit: '',
              sectit: '',
              picUrl: ''
            }
          }
        ],
        currentShow: 'nav-l',
        scrollY: 0
      }
    },
    created() {
      this._getHomeData()
      this.touch = {}
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      setTimeout(() => {
        this._initTimer()
      }, 20)
    },
    activated() {
      this.refresh = true
    },
    deactivated() {
      this.refresh = false
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      navTouchStart(e) {
        this.touch.initialted = true
        let touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      navTouchMove(e) {
        if (!this.touch.initialted) {
          return
        }
        let touch = e.touches[0]
        let detalX = touch.pageX - this.touch.startX
        let detalY = touch.pageY - this.touch.startY
        if (Math.abs(detalY) > Math.abs(detalX)) {
          return
        }
        let left = this.currentShow === 'nav-l' ? 0 : -window.innerWidth
        let offsetWidth = Math.min(0, Math.max(-window.innerWidth, detalX + left))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.nav.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      },
      navTouchEnd(e) {
        let offsetWidth
        if (this.currentShow === 'nav-l') {
          if (this.touch.percent > 0.6) {
            offsetWidth = -window.innerWidth
            this.currentShow = 'nav-r'
          } else {
            offsetWidth = 0
          }
        } else {
          if (this.touch.percent < 0.4) {
            offsetWidth = 0
            this.currentShow = 'nav-l'
          } else {
            offsetWidth = -window.innerWidth
          }
        }
        this.$refs.nav.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        this.touch.initialted = false
      },
      _getHomeData() {
        getDatas().then((res) => {
          if (res.errno === 0) {
            this.recommends = res.data.slider
            this.news = res.data.news
            this.rush = res.data.rush
            this.adfirst = res.data.ad[0]
            this.wrapper = res.data.goods.wrapper
            this.tabList = res.data.goods.tab
          }
        })
      },
      _initTimer() {
        var deadline = Date.UTC(2018, 8, 19, 13, 29)
        var time = {
          sec: this.$refs.sec,
          mini: this.$refs.mini,
          hour: this.$refs.hour
        }
        fnTimeCountDown(deadline, time)
      },
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    },
    watch: {
      scrollY(newY) {
        this.imageHeight = SLIDE_HEIGHT
        this.headerHeight = HEAD_HEIGHT
        this.deltaY = this.imageHeight - this.headerHeight
        this.percent = Math.abs(newY / this.deltaY)
        if (this.percent > 0.5) {
          this.$refs.header.classList.add('active')
        } else {
          this.$refs.header.classList.remove('active')
        }
        this.opacity = this.percent * 1
        this.$refs.header.style.backgroundColor = `rgba(255, 255, 255, ${this.opacity})`
      }
    },
    components: {
      Slider,
      SliderY,
      SliderX,
      Box,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable';
  @import '../../common/scss/mixin';
  @import '../../common/scss/function';

  .home {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: size(100px);
    .header {
      position: absolute;
      width: 100%;
      height: size(100px);
      display: flex;
      align-items: center;
      font-size: $font-size-small-s;
      z-index: 10;
      .header-scan {
        flex: 0 0 14%;
        text-align: center;
        color: $color-text-ll;
        .icon-scan {
          font-size: $font-size-medium;
        }
        .text {
          margin-top: 0.1rem;
        }
      }
      .header-search {
        position: relative;
        flex: 1;
        color: $color-text;
        input {
          box-sizing: border-box;
          width: 100%;
          height: size(60px);
          padding: 0 13%;
          font-size: $font-size-small;
          border-color: transparent;
          background: $color-background-d;
          @include round-all(size(60px));
        }
        .icon-search {
          position: absolute;
          top: 50%;
          left: size(25px);
          transform: translateY(-45%);
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
      .header-news {
        flex: 0 0 12%;
        text-align: center;
        color: $color-text-ll;
        opacity: 1;
        .icon-news {
          font-size: $font-size-medium;
        }
        .text {
          margin-top: 0.1rem;
        }
      }
      &.active {
        border-bottom: 1px solid $color-border-d;
        .header-scan {
          color: $color-text-d;
        }
        .header-search {
          color: $color-text-ll;
          input {
            background: $color-dialog-background;
            &::-webkit-input-placeholder {
              color: $color-text-ll;
            }
          }
        }
        .header-news {
          color: $color-text-d;
        }
      }
    }
    .home-content {
      height: 100%;
      overflow: hidden;
      .content-wrapper {
        height: 100%;
        width: 100%;
        .slider-wrapper {
          position: relative;
          width: 100%;
        }
        .nav-wrapper {
          width: 100%;
          height: size(370px);
          .nav {
            width: 100%;
            white-space: nowrap;
            font-size: 0;
            min-height: 1px;
            .nav-l {
              box-sizing: border-box;
              width: 100%;
              display: inline-flex;
              flex-flow: row wrap;
              align-content: center;
              justify-content: space-between;
              .nav-item {
                flex: 0 0 20%;
                margin-top: 0.2rem;
                text-align: center;
                font-size: 0;
                img {
                  width: size(80px);
                  height: size(80px);
                }
                p {
                  margin-top: 0.1rem;
                  font-size: $font-size-small-s;
                }
              }
            }
            .nav-r {
              box-sizing: border-box;
              width: 100%;
              display: inline-flex;
              flex-flow: row wrap;
              align-content: center;
              justify-content: space-between;
              .nav-item {
                flex: 0 0 20%;
                margin-top: 0.2rem;
                text-align: center;
                font-size: 0;
                img {
                  width: size(80px);
                  height: size(80px);
                }
                p {
                  margin-top: 0.1rem;
                  font-size: $font-size-small-s;
                }
              }
            }
          }
          .dot-wrapper {
            height: 0.6rem;
            font-size: 0;
            line-height: 0.6rem;
            text-align: center;
            .dot {
              display: inline-block;
              margin: 0 4px;
              height: size(8px);
              width: size(8px);
              border-radius: 50%;
              background: $color-theme;
              transform: translateY(30%);
              &.active {
                background: $color-theme-d;
              }
            }
          }
          .jd-news {
            width: 95%;
            margin: 0 auto;
            height: size(60px);
            white-space: nowrap;
            overflow: hidden;
            font-size: $font-size-small;
            color: $color-text-d;
            background: $color-background-d;
            @include round-all(size(60px));
            display: flex;
            align-items: center;
            img {
              display: inline-block;
              height: size(35px);
              margin-left: 0.3rem;
            }
            .slider-ad {
              flex: 1;
              margin: 0 0.1rem;
              height: 1.2em;
              line-height: 1.2em;
              font-size: $font-size-small;
              overflow: hidden;
              .highlight {
                color: $color-sub-theme;
              }
              .ad-text {
                @include no-wrap;
              }
            }
            .more {
              margin-right: 0.3rem;
              padding-left: .2rem;
              border-left: 1px solid $color-text-d;
            }
          }
        }
        .jd-rush {
          width: 100%;
          height: size(280px);
          background: $color-background-d;
          @include round(top, left, size(20px));
          @include round(top, right, size(20px));
          .rush-header {
            width: 100%;
            box-sizing: border-box;
            height: size(70px);
            line-height: size(70px);
            padding: 0 2%;
            overflow: hidden;
            .rush-left {
              float: left;
              height: size(70px);
              font-size: 0;
              .title {
                display: inline-block;
                height: size(70px);
                font-size: 0;
                color: $color-sub-theme;
                .icon-clock {
                  display: inline-block;
                  font-size: $font-size-small;
                }
                h1 {
                  display: inline-block;
                  margin-left: size(6px);
                  font-size: $font-size-small;
                }
              }
              h2 {
                display: inline-block;
                margin: 0 0.2rem;
                color: $color-theme-d;
                font-size: $font-size-small;
              }
              .timer {
                position: relative;
                top: size(-2px);
                display: inline-block;
                height: size(70px);
                font-size: $font-size-small-s;
                .time {
                  padding: 1px 2px 2px;
                  margin-right: 1px;
                  color: $color-text-ll;
                  background: $color-highlight-background;
                  @include round-all(25%);
                }
              }
            }
            .rush-right {
              float: right;
              font-size: 0;
              height: size(70px);
              color: $color-sub-theme;
              h2 {
                display: inline-block;
                font-size: $font-size-small;
              }
              .icon-caret-right-over {
                margin-left: 0.1rem;
                display: inline-block;
                font-size: $font-size-small;
              }
            }
          }
          .slider-wrapper {
            height: size(210px);
          }
        }
        .ad-first {
          min-height: 1px;
          font-size: 0;
          img {
            width: 100%;
          }
        }
        .good-wrapper {
          width: 100%;
          height: size(250px);
          background: $color-background-d;
        }
        .tab-wrapper {
          height: 100%;
          .tab-tit {
            position: relative;
            width: 100%;
            min-height: 1px;
            font-size: 0;
            .floor {
              width: 100%;
            }
            .img-tit {
              display: block;
              width: 100%;
              height: size(54px);
              position: absolute;
              bottom: 0;
              left: 0;
              text-align: center;
              img {
                height: size(54px);
              }
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
      }
    }
  }
</style>
