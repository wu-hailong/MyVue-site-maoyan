<template>
      <li>
        <div class="cinema">
          <div class="cinema-name">
            <span>{{cinema.nm}}</span>
            <span>{{cinema.sellPrice}}<i>元起</i></span>
          </div>
          <div class="cinema-address">
            <span>{{cinema.addr}}</span>
            <span>{{cinema.distance}}</span>
          </div>
          <div class="cinema-label">
            <span>退</span>
            <span>改签</span>
            <span class="vip-tag">小吃</span>
            <span class="vip-tag">折扣卡</span>   
          </div>
          <div class="cinema-discount" v-if="cinema.promotion">
            {{cinema.promotion.cardPromotionTag}}
          </div>
        </div>
        <div class="show-times">近期场次 : 19:10 20:35 21:45</div>
      </li>
</template>

<script>
export default {
  props: ["cinema"]
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl";
li
  padding .13rem .15rem
  // height 1.41rem
  $border(0 0 1px 0)
  .cinema
    // height .94rem
    .cinema-name
      font-size .16rem
      color #000
      line-height .24rem
      height .24rem
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      >span:last-child
        color:#f03d37
        margin-left .25rem
        i 
          font-size .12rem
    .cinema-address
      margin-top .05rem
      font-size .13rem
      line-height .2rem
      color #666
      display flex
      justify-content space-between
      >span:first-child
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
    .cinema-label
      font-size .1rem
      margin .05rem 0
      >span 
        padding 0 .03rem
        margin-right .05rem
        color #589daf
        $border(1px 1px 1px 1px,#589daf)
      .vip-tag
        color #f90;
        $border(1px 1px 1px 1px,#f90) 
    .cinema-discount
      color #999
      font-size .11rem
  .show-times
    color #999
    font-size .12rem
</style>