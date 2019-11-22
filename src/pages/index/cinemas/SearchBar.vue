
<template>
  <div class="search-bar">
      <router-link
        class="check-city"
        to="/city" 
        tag="div"
      >
        <span>{{$store.state.cities.nm}}</span>
        <i class="yo-ico">&#xf033;</i>
      </router-link>
      <router-link 
      class="search-box" 
      to="/search" 
      tag="div"
      >
        <i class="yo-ico">&#xf067;</i>
        <span>搜影院</span>
      </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.search-bar
  height .44rem
  background #f5f5f5
  display flex
  align-items center
  .check-city
    max-width .92rem
    padding-left .15rem
    display flex
    align-items center
    span
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
  .search-box
    flex 1
    min-width 0
    background #fff
    height .29rem
    border-radius .05rem
    margin 0 .18rem 0 .15rem
    font-size 13px
    color #b2b2b2
    display flex
    align-items center
    justify-content center
    i 
     font-size .14rem
     font-weight 700
    


</style>