<template>
  <transition :name="direction" mode="out-in">
    <div class="classify">
      <div class="header bdr-b">
        <div class="header-scan">
          <i class="icon-scan"></i>
        </div>
        <div class="header-search">
          <i class="icon-search"></i>
          <input type="text" placeholder="刷新页面更换占位符">
          <img class="logo-robot" src="../../common/images/logo_robot.png" alt="xiaodong">
        </div>
        <div class="header-news">
          <i class="icon-news"></i>
        </div>
      </div>
      <div class="classify-content">
        <scroll class="nav-tab" ref="tab" :data="classifyList">
          <div ref="scrollBox">
            <div class="nav-item"
                 v-for="(item, index) in classifyList" :key="index">
              <span :data-index="index" @click="moveToCenter">
                {{item.name}}
              </span>
            </div>
          </div>
        </scroll>
        <div class="nav-view" v-if="classifyItem.adImg.length">
          <component :data="classifyItem"
                     :refresh="refresh"
                     :is="currentView"
                     @select="selectGoods"></component>
        </div>
        <div class="loading-container" v-show="!classifyItem.adImg.length">
          <loading></loading>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getDatas} from 'api/getDatas'
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import RecommendList from 'components/classify-list/recommend-list'
  import TestList from 'components/classify-list/test-list'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        classifyList: [],
        classifyItem: {
          name: '',
          adImg: [],
          wrapper1: {
            t: '',
            items: []
          },
          wrapper2: {
            t: '',
            items: []
          }
        },
        currentView: '推荐分类',
        direction: ''
      }
    },
    created() {
      this._getClassifyData()
    },
    mounted() {
      setTimeout(() => {
        this.initNavStyle()
      }, 350)
    },
    activated() {
      this.direction = ''
      this.refresh = true
    },
    deactivated() {
      this.refresh = false
    },
    methods: {
      selectGoods(classify) {
        this.direction = 'slide-left'
        setTimeout(() => {
          this.$router.push({
            path: `/good/${classify.id}`
          })
          this.setClassify(classify)
        })
      },
      _getClassifyData() {
        let self = this
        getDatas().then((res) => {
          if (res.errno === 0) {
            self.classifyList = res.data.classList
            self.classifyItem = self.classifyList[0]
          }
        })
      },
      initNavStyle() {
        let div = this.$refs.tab.$el.children[0]
        div.children[0].classList.add('active')
      },
      moveToCenter(e) {
        let children = this.$refs.scrollBox.children
        for (let i = 0; i < children.length; i++) {
          children[i].classList.remove('active')
        }
        e.target.parentNode.classList.add('active')
        let index = getData(e.target, 'index')
        this.classifyItem = this.classifyList[index]
        this.currentView = this.classifyItem.name
        this._scrollTo(index)
      },
      _scrollTo(index) {
        if (!index || index === 0) {
          return
        }
        if (index > 0 && index < 5) {
          index = 0
        } else {
          index -= 4
        }
        this.$refs.tab.scrollToElement(this.$refs.scrollBox.children[index], 800)
      },
      ...mapMutations({
        setClassify: 'SET_CLASSIFY'
      })
    },
    components: {
      Scroll,
      Loading,
      '推荐分类': RecommendList,
      '京东超市': TestList,
      '国际名牌': RecommendList,
      '奢侈品': TestList,
      '全球购': RecommendList,
      '男装': TestList,
      '女装': RecommendList,
      '男鞋': TestList,
      '女鞋': RecommendList,
      '内衣配饰': TestList,
      '箱包手袋': RecommendList,
      '美妆个护': TestList,
      '钟表珠宝': RecommendList,
      '手机数码': TestList,
      '电脑办公': RecommendList,
      '家用电器': TestList,
      '食品生鲜': RecommendList,
      '酒水饮料': TestList,
      '母婴童装': RecommendList,
      '玩具乐器': TestList,
      '医药保健': RecommendList,
      '计生情趣': TestList,
      '运动户外': RecommendList,
      '汽车用品': TestList,
      '家居厨具': RecommendList,
      '家具家装': TestList,
      '礼品鲜花': RecommendList,
      '宠物生活': TestList,
      '图书音像': RecommendList,
      '邮币': TestList,
      '农资绿植': RecommendList,
      '特产馆': TestList,
      '京东金融': RecommendList,
      '拍卖': TestList,
      '二手商品': RecommendList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/function";
  @import "../../common/scss/mixin";

  .classify {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: size(100px);
    .header {
      display: flex;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1;
      height: size(100px);
      align-items: center;
      background: $color-background-d;
      .header-scan {
        flex: 12%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-scan {
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
      .header-news {
        flex: 12%;
        font-size: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-news {
          color: $color-text-d;
          font-size: $font-size-large;
        }
      }
    }
    .classify-content {
      position: fixed;
      top: size(101px);
      bottom: size(100px);
      width: 100%;
      font-size: $font-size-small;
      color: $color-text-d;
      display: flex;
      .nav-tab {
        flex: 0 0 25%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .nav-item {
          height: size(125px);
          border: 1px solid $color-border;
          margin: -1px -1px 0 0;
          background: $color-background-d;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          &.active {
            color: $color-sub-theme;
            background: $color-background;
          }
        }
      }
      .nav-view {
        flex: 0 0 75%;
        box-sizing: border-box;
        padding: 0 size(20px);
        height: 100%;
        overflow: hidden;
      }
      .loading-container {
        width: 100%;
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    &.slide-left-enter-active {
      bottom: 0;
    }
    &.slide-left-leave-active {
      bottom: 0;
    }
  }

</style>
