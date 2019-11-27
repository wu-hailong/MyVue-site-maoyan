<template>
    <div class="tuan-wrap" v-if="dealList.divideDealList.length !== 0">
      <div class="tuan-title">影院超值套餐</div>
      <ul class="tuan-list">
        <li
        v-for="(item,index) in dealList.divideDealList"
        :key="item+index"
        >
          <img :src="item.dealList[0].imageUrl | wh('444.0')" alt="">
          <div>
            <div class="tuan-name">
              <span>{{item.dealList[0].titleTag}}</span>	
              {{item.dealList[0].title}}
            </div>
            <div class="sale-num">{{item.dealList[0].curNumberDesc}}</div>
            <div class="tuan-price">￥<span>{{item.dealList[0].price}}</span></div>
            <div class="buy-btn">去购买</div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: ["dealList"]
}
</script>

<style lang="stylus">
.tuan-wrap
  margin-top .1rem
  background #fff
  padding-left .15rem
  padding-bottom .2rem
  .tuan-title
    height .45rem
    font-size .15rem
    color #666
    line-height .45rem
  .tuan-list
    li
      height 1.18rem
      padding .13rem 0
      display flex
      img 
        height .92rem
        width .92rem
      >div
        margin-right .15rem
        margin-left .05rem
        width 100%
        position relative
        .tuan-name
          font-size .14rem 
          color #333
          display flex
          align-items center
          span 
            font-size .1rem
            color #fff
            background #f90
            padding 0.01rem .04rem
            border-radius .02rem
            margin-right .07rem
        .sale-num
          color #999
          font-size .12rem
          position absolute
          right 0
          bottom .34rem
        .tuan-price
          color #f03d37
          position absolute
          left 0
          bottom 0
          span
            font-size .17rem
        .buy-btn
          position absolute
          right 0
          bottom 0
          height .27rem
          width .52rem
          color #fff
          padding 0 .08rem
          background #f03d37
          font-size .12rem
          text-align center
          line-height .27rem
          border-radius .03rem
</style>