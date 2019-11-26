<template>
   <div class="cinema-location">
      <div class="location-wrap">
        <div class="cinema-nm">{{cinemaData.nm}}</div>
        <div class="location">{{cinemaData.addr}}</div>
      </div>
      <div class="location-icon">
        <img :src="LocationIcon" alt="">
      </div>
    </div>
</template>

<script>
import LocationIcon from "assets/location.png"
export default {
  props: ["cinemaData"],
  data () {
    return {
        LocationIcon
    }
  }
}
</script>

<style lang="stylus" scoped>
.cinema-location
  padding .15rem 1rem .15rem .15rem
  position relative
  display flex
  align-items center
  background #fff
  .location-icon
    position absolute !important
    height .31rem
    width .71rem
    display flex
    justify-content center
    align-items center
    right 0
    $border(0 0 0 1px)
    img 
      width .19rem
      height .22rem
  .location-wrap
    white-space nowrap
    overflow hidden
    .cinema-nm
      font-size .17rem
      line-height .24rem
      font-weight 700
      text-overflow ellipsis
      overflow hidden   
      color #333 
    .location
      text-overflow ellipsis
      overflow hidden
      color #999
</style>