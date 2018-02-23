<template>
  <div class="product-list">
    <ul>
      <li class="list-item"
          @click="selectItem(item)"
          v-for="(item, index) in lists">
        <img v-lazy="item.picUrl">
        <div class="item-text">
          <h1 v-html="item.name"></h1>
          <div class="info">
            <p class="price">
              <span class="price-int">{{format(item.price)[0]}}</span><span class="price-float">.{{format(item.price)[1]}}</span>
            </p>
            <div class="count">
              <span class="tag" v-if="item.tag">{{item.tag}}</span>
              <span>{{item.cmtNum}}</span>条评价
              <span>{{item.applRate}}</span>%好评
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      lists: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      format(num) {
        let n = num * 1000000 / 10000
        let str = n.toString()
        let len = str.length
        let intNum = str.substring(0, len - 2)
        let floatNum = str.substr(len - 2, 2)
        return [intNum, floatNum]
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/function";

  .product-list {
    min-height: 1px;
    width: 100%;
    .list-item {
      width: 100%;
      height: size(270px);
      background: $color-background-d;
      display: flex;
      align-items: center;
      img {
        flex: 0 0 28%;
        margin-left: size(10px);
        height: size(250px);
      }
      .item-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: size(35px);
        box-sizing: border-box;
        width: 64%;
        height: size(270px);
        font-size: 0;
        border-bottom: 1px solid $color-border;
        padding: size(24px) size(32px) size(24px) 0;
        h1 {
          font-weight: 400;
          color: $color-text-d;
          line-height: 1.2em;
          font-size: $font-size-small-x;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .info {
          font-size: 0;
          color: $color-text-l;
          .price {
            color: $color-sub-theme;
            font-size: $font-size-medium;
            &:before {
              content: '￥';
              font-size: $font-size-small;
            }
            .price-float {
              font-size: $font-size-small;
            }
          }
          .count {
            margin-top: size(10px);
            font-size: $font-size-small;
            .tag {
              color: $color-sub-theme;
              padding: 0 size(5px);
              border: 1px solid $color-sub-theme;
            }
          }
        }
      }
    }
  }

</style>
