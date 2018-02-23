<template>
    <scroll ref="scroll" class="scroll" :data="data.adImg">
      <div ref="list" class="list">
        <div class="ad" v-if="data.adImg">
          <slider :refresh="refresh">
            <div v-for="item in data.adImg">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="wrapper">
          <h1 v-html="data.wrapper1.t"></h1>
          <div class="content">
            <div class="content-item"
                 @click="selectItem(item)"
                 v-for="(item, index) in data.wrapper1.items"
                 :key="index">
              <img v-lazy="item.picUrl">
              <p v-html="item.tit"></p>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <h1 v-html="data.wrapper2.t"></h1>
          <div class="content">
            <div class="content-item"
                 @click="selectItem(item)"
                 v-for="(item, index) in data.wrapper2.items"
                 :key="index">
              <img v-lazy="item.picUrl">
              <p v-html="item.tit"></p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'

  export default {
    props: {
      data: {
        type: Object,
        default: {}
      },
      refresh: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(items) {
        this.$emit('select', items)
      },
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    },
    components: {
      Scroll,
      Slider
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/function";
  @import "../../common/scss/variable";

  .scroll {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    .list {
      padding: size(30px) 0;
      min-height: 1px;
      .ad {
        width: 100%;
        height: size(180px);
        position: relative;
        overflow: hidden;
        img {
          height: size(180px);
        }
      }
      .wrapper {
        width: 100%;
        margin-top: size(40px);
        h1 {
          color: $color-text-d;
          font-size: size(24px);
          font-weight: 400;
        }
        .content {
          margin-top: size(20px);
          padding: 0 size(10px) size(30px) size(10px);
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          background: $color-background-d;
          .content-item {
            box-sizing: border-box;
            flex: 0 0 33.3333%;
            padding: 0 size(15px);
            text-align: center;
            img {
              display: inline-block;
              margin-top: size(30px);
              width: 85%;
              height: size(120px);
            }
            p {
              margin-top: size(20px);
              font-size: size(24px);
              line-height: 1.2em;
              color: $color-text;
            }
          }
        }
      }
    }
  }


</style>
