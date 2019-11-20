<template>
  <div class="detail-box">
    <div class="movie-img">
      <img :src="movieDeatail.img | wh('256.360')" alt />
    </div>
    <div class="movie-detail">
      <div class="movie-title">{{movieDeatail.nm}}</div>
      <div class="e-title">{{movieDeatail.enm}}</div>
      <div class="movie-score">
        {{movieDeatail.sc}}
        <span>({{movieDeatail.snum}}人评)</span>
      </div>
      <div class="movie-type">{{movieDeatail.cat}}</div>
      <div class="movie-time">{{movieDeatail.src}}/{{movieDeatail.dur}}分钟</div>
      <div class="public-time">{{movieDeatail.pubDesc}}</div>
    </div>
    <div class="cover-box"></div>
    <!-- <div class="cover-img" :style="{'background-image':'url(movieDeatail.img | wh(`148.208`))'}">
    </div>-->
    <i class="yo-ico">&#xf07f;</i>
  </div>
</template>

<script>
export default {
  props: ["movieDeatail"]
};
</script>

<style lang="stylus" scoped>
.detail-box
  height 1.88rem
  padding .19rem .3rem .19rem .15rem
  display flex
  position relative
  .movie-img
    height 1.5rem
    width 1.1rem
    img 
      width 100%
      height 100%
  i 
    position absolute
    right .2rem
    top 50%
    color #fff
  .movie-detail
    flex 1
    color #fff
    margin-left .12rem
    div
      font-size .12rem
      line-height .12rem
    .movie-title
      font-size .2rem
      line-height .2rem
      font-weight bold
    .e-title
      margin-top .1rem
    .movie-score
      font-size .18rem
      line-height .18rem
      color #fc0
      font-weight bold
      margin-top .11rem
      span
        font-size .12rem
        color #fff
    .movie-type
      margin-top .1rem
    .movie-time
      margin-top .1rem
    .public-time
      margin-top .1rem
  .cover-box,.cover-img
    position absolute
    z-index -1
    top 0
    left 0
    width 100%
    height 100%
  .cover-box
    background-color #333
  .cover-img
    overflow hidden
    background-size cover
    background-repeat no-repeat
    opacity .22
</style>