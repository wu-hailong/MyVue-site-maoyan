<template>
  <div class="to-app">
    <img src="http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" alt="">
    <div class="text-wrap">
      <div class="title">猫眼</div>
      <div class="content">在线选座，热门影讯，爱上看电影</div>
    </div>
    <div class="btn">立即打开</div>
  </div>
</template>

<script>

  export default {

  }
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/border.styl';
.to-app
  height .64rem
  display flex
  justify-content space-between
  align-items center
  $border(0 0 1px 0)
  background #fff
  img 
    height .44rem
    width .44rem
    margin 0 .1rem 0 .15rem
  .text-wrap
    flex 1
    min-width 0
    .title
      font-size .17rem 
      color #222
    .content
      font-size .12rem
      color #999
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
  .btn
    margin-right .15rem
    width .68rem
    height .3rem
    font-size .13rem
    color #fff
    text-align center
    line-height .3rem
    border-radius .03rem
    background-color #ef4238
</style>