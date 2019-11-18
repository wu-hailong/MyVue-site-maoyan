<template>
      <li>
        <div class="movie-img">
          <img :src="movie.img  | wh('256.360')" alt="">
        </div>
        <div class="content-wrap">
          <div><span>{{movie.nm}}</span><span>{{movie.version}}</span></div>
          <div>
            <span v-if="movie.sc == 0">暂无评分</span>
            <span v-if="movie.sc !== 0">观众评</span>
            <span v-if="movie.sc !== 0"> {{movie.sc}}</span> 
          </div>
          <div>{{movie.star}}</div>
          <div>{{movie.showInfo}}</div>
        </div>
        <TypeButton :movie="movie"></TypeButton>
      </li>
</template>

<script>
import TypeButton from "./TypeButton"
export default {
    props: {
      movie:{
        type:Object
      },
      index:Number
    },
    components: {
      TypeButton
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/border.styl';
  li
    height 1.14rem
    $border(0 0 1px 0)
    display flex
    align-items center
    .movie-img
      width .64rem
      height .9rem
      img 
        width 100%
        height 100%
    .content-wrap
      min-width 0
      flex 1
      div
        padding-left .1rem
        font-size .13rem
        color #666
        line-height .13rem
        white-space nowrap 
        overflow hidden
        text-overflow ellipsis  
      >div:nth-child(1)
        line-height .17rem
        >span:first-child
          font-size .17rem
          color #333
          font-weight 700
          padding-right .05rem
          white-space nowrap 
          overflow hidden
          text-overflow ellipsis
        >span:last-child
          color #3c9fe6
      >div:nth-child(2)
        margin .07rem 0 .06rem
        >span:last-child
          font-weight 700
          color #faaf00
          font-size .15rem
      >div:nth-child(4)
        margin-top .06rem
    .btn
      width .47rem
      height .27rem
      text-align center
      line-height .27rem
      color #fff
      border-radius 4px
      font-size 12px
      background-color #f03d37
    .blue-btn
      background-color #3c9fe6
    .yellow-btn
      background-color #faaf00
</style>