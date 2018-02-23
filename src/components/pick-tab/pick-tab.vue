<template>
  <div class="pick-tab">
    <div class="pick-header">
      <img :src="good.picUrl">
      <div class="info">
        <h3 class="price" v-html="format(good.price)"></h3>
        <p class="good-id">商品编号：{{good.nid}}</p>
      </div>
      <div @click="close">
        <i class="icon-close"></i>
      </div>
    </div>
    <scroll ref="scroll" class="scroll" :data="contentList">
      <div class="pick-content" ref="pickContent" @click="refreshScroll">
        <div class="pick-group" v-for="(item, index) in good.pickList">
          <h3 v-html="item.name"></h3>
          <div class="pick-options" v-for="(tag, index2) in item.options">
            <label :for="index + 'a' + index2"
                   class="pick-item"
                   @click="changePick(tag, $event)">
              <input type="checkbox"
                     :value="tag"
                     :id="index + 'a' + index2"
                     v-model="pickItems">
              <span>{{ tag }}</span>
            </label>
          </div>
        </div>
        <div class="number-control">
          <div class="number-l">
            <span>数量</span>
          </div>
          <div class="number-r">
            <div ref="decre" class="control disabled" @click="decreaseNum">
              <i class="icon-decrease"></i>
            </div>
            <input ref="input"
                   :value="buyNum"
                   @input="updateValue($event.target.value)"
                   @focus="saveValue"
                   @blur="correctNull">
            <div ref="incre" class="control" @click="increaseNum">
              <i class="icon-increase"></i>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="pick-footer"
         @click="add">
      <span>
      {{changeText}}
    </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        buyNum: 1,
        contentList: []
      }
    },
    props: {
      good: {
        type: Object,
        default: {}
      },
      changeText: {
        type: String,
        default: '加入购物车'
      }
    },
    computed: {
      ...mapGetters([
        'pickItems',
        'time'
      ])
    },
    mounted() {
      this._initStyle()
    },
    methods: {
      refreshScroll() {
        if (this.flag) {
          return
        } else {
          this.$refs.scroll.refresh()
          this.flag = true
        }
      },
      close(isAdd) {
        this.$emit('close', isAdd)
      },
      add() {
        this.addToCart(this.good)
        setTimeout(() => {
          this.close('add')
        }, 200)
        setTimeout(() => {
          this.buyNum = 1
          this.setBuyNum(this.buyNum)
        }, 500)
      },
      _initStyle() {
        let content = this.$refs.pickContent
        for (let i = 0; i < content.children.length - 1; i++) {
          let group = content.children[i]
          for (let j = 1; j < group.children.length; j++) {
            let option = group.children[j]
            option.firstChild.classList.remove('active')
          }
          let child = content.children[i].querySelector('.pick-options')
          child.querySelector('label').classList.add('active')
        }
      },
      changePick(item, e) {
        let arr = []
        this.pickItems.map(p => arr.push(p))      // 复制pickItems数组到arr
        let parent = e.target.parentNode.parentNode     // 找到点击label的祖先元素pick-group
        for (let i = 1; i < parent.children.length; i++) {   // 跳过第一个h3元素，从第一个pick-options开始遍历
          let label = parent.children[i].firstChild     // 找到每个pick-options下的label元素
          label.classList.remove('active')      // 移除该label元素的active类
          let value = label.firstChild.value    // 获得label下input元素的值
          let record = this.pickItems.find(p => p === value)   // 获得pickItems数组中与该值相同的返回值
          if (record) {
            let index = arr.indexOf(record)   // 找到该元素在arr数组中的索引
            arr[index] = item    // 用点击元素替换该元素在arr中的位置
          }
        }
        e.target.classList.add('active')    // 为点击目标label添加active类
        this.setPickItems(arr)    // 提交PickItems数组的修改
      },
      saveValue() {
        this.initValue = this.$refs.input.value
      },
      correctNull() {
        // 当blur事件发生时，文本框值为空，将购买值重置为focus事件之前的值
        if (this.$refs.input.value === '') {
          this.buyNum = this.initValue
          this.$emit('input', this.buyNum)
          this.setBuyNum(this.buyNum)
        }
      },
      updateValue(value) {
        let formattedValue = value.replace(/\D|^0/g, '')
        formattedValue.trim()
        if (formattedValue > 200) {
          formattedValue = 200
        }
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue
        }
        this.buyNum = Number(formattedValue)
        if (this.$refs.input.value === '') {
          this.buyNum = ''
        }
        this.$emit('input', Number(formattedValue))
        this.setBuyNum(this.buyNum)
      },
      decreaseNum() {
        if (this.buyNum > 1) {
          this.buyNum -= 1
        } else {
          this.buyNum = 1
        }
        this.setBuyNum(this.buyNum)
      },
      increaseNum() {
        if (this.buyNum < 200) {
          this.buyNum += 1
        } else {
          this.buyNum = 200
        }
        this.setBuyNum(this.buyNum)
      },
      format(num) {
        let n = num * 1000000 / 10000
        let str = n.toString()
        let len = str.length
        let intNum = str.substring(0, len - 2)
        let floatNum = str.substr(len - 2, 2)
        return `${intNum}.${floatNum}`
      },
      ...mapMutations({
        'setPickItems': 'SET_PICKITEMS',
        'setBuyNum': 'SET_BUYNUM'
      }),
      ...mapActions([
        'addToCart'
      ])
    },
    watch: {
      buyNum(newValue) {
        if (newValue === 1) {
          this.$refs.decre.classList.add('disabled')
        } else if (newValue >= 200) {
          this.$refs.incre.classList.add('disabled')
        } else {
          this.$refs.decre.classList.remove('disabled')
          this.$refs.incre.classList.remove('disabled')
        }
      },
      time(newValue) {
        this._initStyle()
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

  .pick-tab {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    .pick-header {
      width: 100%;
      height: size(180px);
      position: relative;
      display: flex;
      font-size: 0;
      z-index: 60;
      box-sizing: border-box;
      border-bottom: 1px solid $color-border;
      padding-left: size(20px);
      background-color: $color-background-d;
      img {
        position: relative;
        top: size(-20px);
        height: size(180px);
        border: 1px solid rgba(200, 200, 100, 0.2);
        @include round(top, left, size(10px));
        @include round(top, right, size(10px));
      }
      .info {
        margin-left: size(10px);
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .price {
          color: $color-sub-theme;
          font-size: $font-size-small-x;
          margin-bottom: size(20px);
          &:before {
            content: '￥';
            font-size: $font-size-small;
          }
        }
        .good-id {
          font-size: $font-size-small-m;
          margin-bottom: size(20px);
        }
      }
      .icon-close {
        position: absolute;
        top: size(10px);
        right: size(10px);
        font-size: $font-size-large;
        color: $color-text-l;
      }
    }
    .scroll {
      height: size(520px);
      overflow: hidden;
      .pick-content {
        width: 100%;
        height: size(700px);
        box-sizing: border-box;
        padding-left: size(20px);
        background-color: $color-background-d;
        .pick-group {
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          border-bottom: 1px solid $color-border;
          padding: size(25px) size(20px) 0 0;
          h3 {
            font-weight: normal;
            font-size: $font-size-small;
            margin-bottom: size(20px);
          }
          .pick-item {
            box-sizing: border-box;
            margin-right: size(30px);
            margin-bottom: size(30px);
            padding: 0 size(20px);
            min-width: size(140px);
            height: size(50px);
            line-height: size(50px);
            display: inline-block;
            float: left;
            text-align: center;
            font-size: 0;
            border: 1px solid $color-background-border;
            &.active {
              border: 1px solid $color-sub-theme;
            }
            input {
              display: none;
            }
            span {
              font-size: $font-size-small;
              color: $color-text-d;
              pointer-events: none;
            }
            input:checked + span {
              color: $color-sub-theme;
            }
          }
        }
        .number-control {
          width: 100%;
          height: size(79px);
          box-sizing: border-box;
          padding: size(30px) size(20px) 0 0;
          overflow: hidden;
          .number-l {
            float: left;
            height: size(50px);
            line-height: size(50px);
            font-size: 0;
            span {
              font-size: $font-size-small;
            }
          }
          .number-r {
            float: right;
            width: size(175px);
            height: size(47px);
            display: flex;
            border: 1px solid $color-background-border;
            .control {
              font-size: 0;
              &.disabled {
                opacity: 0.3;
              }
              i {
                line-height: size(47px);
                padding: 0 size(6px);
                font-size: $font-size-medium-x;
                color: $color-text-d;
              }
            }
            input {
              width: 44%;
              box-sizing: border-box;
              margin-top: -1px;
              margin-bottom: -1px;
              font-size: $font-size-small-m;
              text-align: center;
              border: 1px solid $color-background-border;
              &:active {
                border: 1px solid $color-sub-theme;
              }
            }
          }
        }
      }
    }
    .pick-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: size(100px);
      background: $color-sub-theme;
      text-align: center;
      line-height: size(100px);
      font-size: 0;
      span {
        color: $color-text-ll;
        font-size: $font-size-medium;
        font-weight: 200;
      }
    }
  }
</style>
