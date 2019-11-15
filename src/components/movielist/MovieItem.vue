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
            <span v-if="movie.sc !== 0">{{movie.sc}}</span> 
          </div>
          <div>{{movie.star}}</div>
          <div>{{movie.showInfo}}</div>
        </div>
        <div class="btn">购票</div>
      </li>
</template>

<script>
export default {
  props: {
    movie:{
      type:Object
    },
    index:Number
  },
  filters: {
    wh(value, args) {
      return value.replace('w.h', args)
    }
  }
}
</script>

<style lang="stylus" scoped>
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
      flex 1
      div
        padding-left .1rem
        font-size .13rem
        color #666
        line-height .13rem  
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
        // >span:last-child

      >div:nth-child(2)
        margin .07rem 0 .06rem
      //  >div:nth-child(3)
      >div:nth-child(4)
        margin-top .06rem
    .btn
        width .47rem
        height .27rem
        text-align center
        line-height .27rem
        background-color #f03d37
        color #fff
        border-radius 4px
        font-size 12px
</style>