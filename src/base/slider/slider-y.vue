<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
        <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getData, prefixStyle} from 'common/js/dom'

  const ITEM_HEIGHT = 1.2
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    data() {
      return {
        offsetHeight: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderHeight()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)
    },
    methods: {
      _setSliderHeight() {
        this.children = this.$refs.sliderGroup.children
        let height = 0
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          child.classList.add('slider-item')
          height += ITEM_HEIGHT + 'em'
        }
        if (this.loop) {
          height += 2 * ITEM_HEIGHT + 'em'
        }
        this.$refs.sliderGroup.style.height = height + 'em'
      },
      _initSlider() {
        if (this.loop) {
          let group = this.$refs.sliderGroup
          let firstMirror = this.children[0].cloneNode(true)
          getData(firstMirror, 'index', this.children.length)
          group.appendChild(firstMirror)
        }
      },
      _play() {
        let num = this.$refs.sliderGroup.children.length
        let maxOffset = (num - 1) * ITEM_HEIGHT

        let incrementNumber = () => {
          this.offsetHeight += ITEM_HEIGHT
          if (this.offsetHeight < maxOffset) {
            this.$refs.sliderGroup.style[transform] = `translate3d(0, -${this.offsetHeight}em, 0)`
            this.$refs.sliderGroup.style[transitionDuration] = `0.5s`
            setTimeout(incrementNumber, 4000)
          } else {
            this.$refs.sliderGroup.style[transform] = `translate3d(0, -${this.offsetHeight}em, 0)`
            this.offsetHeight = 0
            setTimeout(() => {
              this.$refs.sliderGroup.style[transitionDuration] = ``
              this.$refs.sliderGroup.style[transform] = `translate3d(0, -${this.offsetHeight}em, 0)`
            }, 500)
            setTimeout(incrementNumber, 4000)
          }
        }
        this.timer = setTimeout(incrementNumber, 4000)
      }
    },
    destoryed() {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  .slider {
    height: 100%;
    .slider-group {
      position: relative;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
