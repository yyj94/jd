<template>
  <div class="slider" ref="slider">
    <div class="slider-group"
         ref="sliderGroup"
         @touchstart="sliderTouchStart"
         @touchmove="sliderTouchMove"
         @touchend="sliderTouchEnd">
      <slot></slot>
      <div class="more">
        <i class="icon-caret-left"></i>
        <span>查看更多</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')
  const IMG_WIDTH = 2.2666666
  const MORE_WIDTH = 0.8933333
  const FIX_WIDTH = 0.1333333

  export default {
    created() {
      this.touch = {}
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
      }, 20)
    },
    methods: {
      _setSliderWidth() {
        let width = 0
        let imgWidth = IMG_WIDTH
        this.children = this.$refs.sliderGroup.children
        for (let i = 0; i < this.children.length - 1; i++) {
          let child = this.children[i]
          child.classList.add('slider-item')
          width += imgWidth
        }
        width += MORE_WIDTH
        this.touch.left = width - window.px2rem(this.$refs.slider.clientWidth)
        this.$refs.sliderGroup.style.width = width + 'rem'
      },
      sliderTouchStart(e) {
        this.touch.initialted = true
        let touch = e.touches[0]
        this.touch.StartX = touch.pageX
        this.touch.StartY = touch.pageY
      },
      sliderTouchMove(e) {
        if (!this.touch.initialted) {
          return
        }
        let touch = e.touches[0]
        let detalX = window.px2rem(touch.pageX - this.touch.StartX)
        let detalY = window.px2rem(touch.pageY - this.touch.StartY)
        if (Math.abs(detalY) > Math.abs(detalX)) {
          return
        }
        let offsetWidth
        let moveLeft = -(this.touch.left + FIX_WIDTH)
        if (!this.touch.initWidth) {
          offsetWidth = Math.min(0, Math.max(moveLeft, detalX))
        } else {
          offsetWidth = Math.min(0, Math.max(moveLeft, detalX + this.touch.initWidth))
        }
        this.touch.offsetWidth = offsetWidth
        this.$refs.sliderGroup.style[transform] = `translate3d(${offsetWidth}rem, 0, 0)`
      },
      sliderTouchEnd(e) {
        let offsetWidth = this.touch.offsetWidth
        if (offsetWidth < -this.touch.left) {
          setTimeout(() => {
            window.location.href = `https://ms.m.jd.com/seckill/seckillList`
          }, 500)
        }
        offsetWidth = Math.max(offsetWidth, -this.touch.left)
        this.$refs.sliderGroup.style[transform] = `translate3d(${offsetWidth}rem, 0, 0)`
        this.touch.initWidth = offsetWidth
        this.touch.initialted = false
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/function";

  .slider {
    min-height: 1px;
    .slider-group {
      height: size(210px);
      white-space: nowrap;
      overflow: hidden;
      .slider-item {
        float: left;
        width: size(170px);
        height: size(210px);
        text-align: center;
        img {
          width: size(120px);
          height: size(120px);
        }
        .change {
          margin-top: size(8px);
          font-size: $font-size-small;
          color: $color-sub-theme;
          &:before {
            position: relative;
            left: 2%;
            content: '￥';
            font-size: $font-size-small-s;
          }
        }
        .price {
          margin-top: size(10px);
          font-size: $font-size-small-s;
          text-decoration: line-through;
          &:before {
            position: relative;
            left: 2%;
            content: '￥';
            font-size: $font-size-small-s;
          }
        }
      }
      .more {
        float: left;
        width: size(52px);
        margin-right: size(15px);
        height: size(210px);
        font-size: 0;
        color: $color-text;
        .icon-caret-left {
          float: left;
          position: relative;
          top: 38%;
          font-size: $font-size-small;
        }
        span {
          display: inline-block;
          position: relative;
          top: 15%;
          letter-spacing: 5px;
          writing-mode: vertical-rl;
          font-size: $font-size-small;
        }
      }
    }
  }
</style>
