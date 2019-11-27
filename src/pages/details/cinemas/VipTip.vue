<template>
   <div class="vip-tips">
    <div>折扣卡</div>
    <div>现在开卡，首单2张最高立减6元</div>
    <div>20元起开卡</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.vip-tips
  height .42rem
  background #fff5ea
  display flex
  align-items center
  padding 0 .15rem
  >div:first-child
    background #ff941a
    text-align center
    line-height .15rem
    width .34rem
    height .15rem
    font-size .1rem
    color #fff
    border-radius .02rem
  >div:nth-child(2)
    margin-left .1rem
    color #fa9600
    font-size .12rem
    flex 1
    min-width 0
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  >div:last-child
    font-size .12rem
    color #999
    width .7rem
</style>