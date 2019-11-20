<template>
   <header><i @click="handleClick" class="yo-ico" >&#xf07d;</i>{{movieDeatail.nm}}</header>
</template>

<script>
export default {
  props: ["movieDeatail"],
  methods: {
    handleClick(){
      this.$router.back()   
    }
  }
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