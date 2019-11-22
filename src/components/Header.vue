<template>
  <header>
    <slot></slot>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
header
  text-align center
  line-height .5rem
  height .5rem
  background #e54847
  color #fff
  font-size .18rem
  position relative
  i 
    position absolute
    left .06rem
    font-size .28rem
</style>