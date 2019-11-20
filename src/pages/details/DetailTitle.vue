<template>
   <header><router-link tag="i" to="/" class="yo-ico" >&#xf07d;</router-link>{{movieDeatail.nm}}</header>
</template>

<script>
export default {
  props: ["movieDeatail"]
}
</script>

<style lang="stylus" scoped>
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
    left .1rem 
</style>