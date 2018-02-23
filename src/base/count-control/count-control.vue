<template>
  <div class="count-control">
    <div ref="decre" class="control disabled" @click="decreaseNum">
      <i class="icon-decrease"></i>
    </div>
    <input ref="input"
           :value="this.good.quantity"
           @input="updateValue($event.target.value)"
           @focus="saveValue"
           @blur="correctNull">
    <div ref="incre" class="control" @click="increaseNum">
      <i class="icon-increase"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        num: 0
      }
    },
    props: {
      good: {
        type: Object,
        default: {}
      }
    },
    mounted() {
      this.num = this.good.quantity + 1
      this.num -= 1
    },
    methods: {
      saveValue() {
        this.initValue = this.$refs.input.value
        console.log(this.num)
      },
      correctNull() {
        if (this.$refs.input.value === '') {
          this.num = Number(this.initValue)
          this.$emit('input', this.num)
          this.setBuyNum(this.num)
          this.changeNumCart(this.good)
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
        this.num = Number(formattedValue)
        if (this.$refs.input.value === '') {
          this.num = ''
        }
        this.$emit('input', Number(formattedValue))
        this.setBuyNum(this.num)
        this.changeNumCart(this.good)
      },
      decreaseNum() {
        this.num = this.good.quantity
        if (this.num > 1) {
          this.num -= 1
        } else {
          this.num = 1
        }
        this.setBuyNum(this.num)
        this.changeNumCart(this.good)
      },
      increaseNum() {
        this.num = this.good.quantity
        if (this.num < 200) {
          this.num += 1
        } else {
          this.num = 200
        }
        this.setBuyNum(this.num)
        this.changeNumCart(this.good)
      },
      ...mapMutations({
        'setBuyNum': 'SET_BUYNUM',
        'changeNumCart': 'CHANGE_NUM_CART'
      })
    },
    watch: {
      num(newValue) {
        if (newValue === 1) {
          this.$refs.decre.classList.add('disabled')
        } else if (newValue >= 200) {
          this.$refs.incre.classList.add('disabled')
        } else {
          this.$refs.decre.classList.remove('disabled')
          this.$refs.incre.classList.remove('disabled')
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/function";

  .count-control {
    width: 100%;
    .control {
      font-size: 0;
      &.disabled {
        opacity: 0.3;
      }
      i {
        line-height: size(40px);
        padding: 0 size(6px);
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    input {
      display: inline-block;
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
</style>
