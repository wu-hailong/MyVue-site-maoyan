<template>
  <div class="check-bar">
      <div>全城 <i class="yo-ico">&#xf033;</i></div>
      <div>品牌 <i class="yo-ico">&#xf033;</i></div>
      <div>特色 <i class="yo-ico">&#xf033;</i></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl";
.check-bar
  height .4rem
  display flex
  background #fff
  $border(0 0 1px 0)
  >div
    line-height .4rem
    flex 1
    text-align center
    position relative
  >div::after
    content ""
    display block
    position absolute
    height .2rem
    top .1rem
    left 0
    border-left 1px solid #e8e8e8
  >div:nth-child(1)::after
    display none

</style>