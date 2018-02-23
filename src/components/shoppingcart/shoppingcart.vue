<template>
  <div class="shoppingcart">
    <div class="header">
      <div class="header-m">
        <span>购物车</span>
        <i class="icon-locate-single"></i>
      </div>
      <div class="header-r">
        <i class="icon-news"></i>
        <span class="edit">编辑</span>
      </div>
    </div>
    <div class="content">
      <div v-if="!login" class="login-row">
        <button>登录</button>
        <span>登录后同步电脑与手机购物车中的商品</span>
      </div>
      <div class="divided-bg"></div>
      <div v-if="cartProducts.length" class="cart-list">
        <div class="shop-title">
          <input id="selectAll" type="checkbox" v-model="checked">
          <label for="selectAll" class="check-wrapper">
            <span ref="checkTop" class="checkbox" @click="togglePendingAll"></span>
          </label>
          <i class="icon-jd"></i>
          <span class="shop-name">京东自营</span>
        </div>
        <div class="product-group" ref="productGroup">
          <div class="product-item" v-for="(item, index) in cartProducts">
            <label :for="index" class="check-wrapper">
              <input :id="index" type="checkbox" v-model="checkboxModel" :value="item.nid" @click="togglePending(item)">
              <span class="checkbox"></span>
            </label>
            <img :src="item.picUrl">
            <div class="product-info">
              <div class="info">
                <h3 v-html="item.name"></h3>
                <p>
                  <span>重量:{{item.weight}}</span>
                  <span>{{item.features.list1.name}}:{{item.features.list1.selected}}</span>
                </p>
              </div>
              <div class="pirce-quantity">
                <div class="price">
                  <span class="price-int">{{format(item.price)[0]}}</span><span class="price-float">.{{format(item.price)[1]}}</span>
                </div>
                <count-control class="quantity"
                               :good="item">
                </count-control>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-info">
        <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
      </div>
      <div v-if="cartProducts.length" class="count-row">
        <div class="count bdr-b">
          <div class="count-l" @click="togglePendingAll">
            <span ref="checkBottom" class="checkbox"></span>
            <span class="text">全选</span>
          </div>
          <div class="count-m">
            <span>合计：</span>
            <span>￥{{format(totalPrice)[0]}}.{{format(totalPrice)[1]}}</span>
          </div>
        </div>
        <button :disabled="!pendingList.length" class="button" @click="checkout(cartProducts)">
          去结算<span>({{totalNum}})</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import CountControl from 'base/count-control/count-control'

  export default {
    data() {
      return {
        login: false
      }
    },
    computed: {
      totalPrice() {
        this.count = 0
        this.pendingList.forEach((p) => {
          this.count += p.quantity * p.price
        })
        return this.count
      },
      totalNum() {
        this.count = 0
        this.pendingList.forEach((p) => {
          this.count += p.quantity
        })
        return this.count
      },
      ...mapGetters([
        'cartProducts',
        'pendingList',
        'checkoutStatus',
        'checked',
        'checkboxModel'
      ])
    },
    methods: {
      togglePendingAll() {
        if (this.checked) {
          this.$refs.checkTop.classList.remove('active')
          this.$refs.checkBottom.classList.remove('active')
          this.clearAll()
        } else {
          this.$refs.checkTop.classList.add('active')
          this.$refs.checkBottom.classList.add('active')
          this.selectAll()
        }
      },
      togglePending(item) {
        this.toggleItem(item)
      },
      checkout(products) {
        this.checkout(products)
      },
      format(num) {
        if (num === 0) {
          return ['0', '00']
        }
        let n = num * 1000000 / 10000
        let str = n.toString()
        let len = str.length
        let intNum = str.substring(0, len - 2)
        let floatNum = str.substr(len - 2, 2)
        return [intNum, floatNum]
      },
      ...mapMutations({
        'togglePendingList': 'TOGGLE_PENDINGLIST',
        'setCheckboxModel': 'SET_CHECKBOXMODEL',
        'setChecked': 'SET_CHECKED',
        'toggleCheckboxModel': 'TOGGLE_CHECKBOXMODEL'
      }),
      ...mapActions([
        'checkout',
        'clearAll',
        'selectAll',
        'toggleItem'
      ])
    },
    watch: {
      checkboxModel() {
        if (this.checkboxModel.length === this.cartProducts.length) {
          this.$refs.checkTop.classList.add('active')
          this.$refs.checkBottom.classList.add('active')
        } else {
          this.$refs.checkTop.classList.remove('active')
          this.$refs.checkBottom.classList.remove('active')
        }
      }
    },
    components: {
      CountControl
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/function";
  @import "../../common/scss/mixin";

  .shoppingcart {
    position: fixed;
    top: 0;
    bottom: size(100px);
    width: 100%;
    .header {
      height: size(100px);
      width: 100%;
      box-sizing: border-box;
      padding: 0 size(20px);
      position: fixed;
      overflow: hidden;
      background: $color-background-d;
      border-bottom: 1px solid $color-background-border;
      font-size: 0;
      .header-m {
        display: inline-block;
        margin-left: size(300px);
        width: size(150px);
        height: size(100px);
        line-height: size(100px);
        color: $color-text-d;
        font-size: 0;
        span {
          font-size: $font-size-medium;
        }
        i {
          position: relative;
          top: size(2px);
          margin-left: size(10px);
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .header-r {
        float: right;
        display: inline-block;
        height: size(100px);
        .edit {
          float: right;
          width: size(100px);
          height: size(100px);
          line-height: size(100px);
          text-align: center;
          color: $color-text-l;
          font-size: $font-size-small;
          font-weight: 400;
        }
        i {
          width: size(50px);
          height: size(100px);
          line-height: size(100px);
          text-align: center;
          float: right;
          font-size: $font-size-large;
          color: $color-text-d;
        }
      }
    }
    .content {
      position: fixed;
      top: size(100px);
      bottom: size(100px);
      width: 100%;
      .login-row {
        height: size(70px);
        width: 100%;
        background: $color-background-d;
        overflow: hidden;
        font-size: 0;
        button {
          width: size(140px);
          height: size(50px);
          line-height: size(50px);
          float: left;
          margin: size(10px) size(40px) size(10px) size(50px);
          padding: 0;
          background: $color-background-d;
          color: $color-text;
          text-align: center;
          font-size: $font-size-small;
          border: 1px solid $color-background-border;
          @include round-all(size(6px));
        }
        span {
          float: left;
          height: size(70px);
          padding: size(4px) 0;
          box-sizing: border-box;
          line-height: size(32px);
          font-size: $font-size-small;
          color: $color-text;
          width: size(410px);
          letter-spacing: size(2px);
        }
      }
      .divided-bg {
        height: size(25px);
        width: 100%;
        background: $color-border;
      }
      .cart-list {
        width: 100%;
        .shop-title {
          height: size(80px);
          width: 100%;
          background: $color-background;
          display: flex;
          align-items: center;
          .check-wrapper {
            width: 11%;
            height: size(80px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0;
            .checkbox {
              display: inline-block;
              width: size(36px);
              height: size(36px);
              border: 1px solid $color-text;
              border-radius: size(36px);
              &.active {
                background: url('../../common/images/check.png') no-repeat center center;
                background-size: cover;
                border: none;
              }
            }
          }
          input {
            display: none;
          }
          i {
            color: $color-text-d;
            font-size: $font-size-medium-x;
            font-weight: 500;
            position: relative;
            top: size(3px);
            margin-right: size(3px);
          }
          .shop-name {
            color: $color-text-d;
            font-size: $font-size-small-x;
          }
        }
        .product-group {
          width: 100%;
          min-height: 1px;
          .product-item {
            width: 100%;
            height: size(250px);
            overflow: hidden;
            background: $color-background-d;
            border-top: 2px solid $color-background-border;
            display: flex;
            align-items: center;
            &:nth-child(1) {
              border: none;
            }
          }
          .check-wrapper {
            width: 11%;
            height: size(250px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0;
            .checkbox {
              display: inline-block;
              width: size(36px);
              height: size(36px);
              border: 1px solid $color-text;
              border-radius: size(36px);
              pointer-events: none;
              &.active {
                background: url('../../common/images/check.png') no-repeat center center;
                background-size: cover;
                border: none;
              }
            }
          }
          input {
            display: none;
          }
          input:checked + span {
            background: url('../../common/images/check.png') no-repeat center center;
            background-size: cover;
            border: none !important;
          }
          img {
            width: size(175px);
            height: size(200px);
            border: 1px solid $color-border;
            @include round-all(size(8px));
            margin-right: size(16px);
          }
          .product-info {
            flex: 1;
            padding-right: size(20px);
            height: size(190px);
            font-size: $font-size-medium;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .info {
              width: 100%;
              h3 {
                font-weight: normal;
                color: $color-text-d;
                line-height: size(32px);
                font-size: $font-size-small;
                width: size(400px);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              p {
                line-height: size(32px);
                color: $color-text-l;
                font-size: $font-size-small-m;
              }
            }
            .pirce-quantity {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: size(50px);
              line-height: size(50px);
              .price {
                .price-int {
                  color: $color-sub-theme;
                  font-size: $font-size-small-x;
                  &:before {
                    position: relative;
                    right: size(-2px);
                    content: '￥';
                    font-size: $font-size-small-m;
                  }
                }
                .price-float {
                  color: $color-sub-theme;
                  font-size: $font-size-small-m;
                }
              }
              .quantity {
                width: size(150px);
                height: size(40px);
                display: flex;
                border: 1px solid $color-background-border;
              }
            }
          }
        }
      }
      .checkout-info {
        font-size: $font-size-large-x;
        color: $color-text-d;
      }
      .count-row {
        position: fixed;
        bottom: size(100px);
        left: 0;
        width: 100%;
        height: size(100px);
        font-size: 0;
        display: flex;
        .count {
          width: 70%;
          height: size(100px);
          background: $color-background-d;
          display: flex;
          .count-l {
            width: size(150px);
            height: size(100px);
            align-items: center;
            display: flex;
            justify-content: space-between;
            font-size: 0;
            .checkbox {
              margin-left: size(20px);
              display: inline-block;
              width: size(36px);
              height: size(36px);
              border: 1px solid $color-text;
              border-radius: size(36px);
              &.active {
                background: url('../../common/images/check.png') no-repeat center center;
                background-size: cover;
                border: none;
              }
            }
            .text {
              margin-right: size(20px);
              font-size: $font-size-small-x;
              color: $color-text;
            }
          }
          .count-m {
            margin-left: size(10px);
            height: size(100px);
            line-height: size(100px);
            font-size: 0;
            color: $color-text-d;
            span {
              font-size: $font-size-medium;
            }
          }
        }
        .button {
          width: 30%;
          height: size(100px);
          line-height: size(100px);
          background: $color-sub-theme;
          color: $color-text-ll;
          text-align: center;
          font-size: $font-size-medium;
          letter-spacing: size(2px);
          span {
            font-size: $font-size-small-s;
            letter-spacing: 0;
          }
        }
      }
    }
  }
</style>
