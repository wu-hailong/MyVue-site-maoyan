<template>
  <div class="outter-wrap">
    <section class="content-wrap">
      <ToApp></ToApp>
      <div class="content">
        <div class="movie-box">
            <div class="movie-img">
              <img :src="movieDetail.img | wh('300.414')" alt="">
            </div>
            <div class="movie-msg">
              <div class="movie-name">{{movieDetail.nm}}</div>
              <div class="movie-enm movie-row">{{movieDetail.enm}}</div>
              <div class="movie-type movie-row">{{movieDetail.cat}}</div>
              <div class="movie-actors movie-row">{{movieDetail.star}}</div>
              <div class="pub-time movie-row">{{movieDetail.pubDesc}} / {{movieDetail.dur}}分钟 <i class="yo-ico">&#xf07f;</i></div>
              <div class="movie-check">
                <div class="wash btn"><img :src="WashImg" alt=""> 想看</div>
                <div class="watched btn"><img :src="WatchedImg" alt=""> 看过</div>
              </div>
            </div>
        </div>
        <div class="score-msg">
          <div class="score-top">
            <div><img :src="SmallLogo" alt=""> 实时口碑</div>
            <div><span>{{movieDetail.wash}}</span>人想看 <span>{{movieDetail.watched}}</span>人看过</div>
          </div>
          <div class="score-middle">
            <div class="score-box">
                <div class="score">{{movieDetail.sc}}</div>
                <div class="score-nm">{{movieDetail.snum}}人评</div>
            </div>
            <div class="score-detail">
                <div class="star-percent-bar">
                  <div class="star">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                  </div>
                  <div class="bar">
                    <div class="percent-bar"></div>
                  </div>
                  <div class="percent-value"></div>
                </div>
                <div class="star-percent-bar">
                  <div class="star">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                  </div>
                  <div class="bar">
                    <div class="percent-bar"></div>
                  </div>
                  <div class="percent-value">11.5%</div>
                </div>
                <div class="star-percent-bar">
                  <div class="star">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                  </div>
                  <div class="bar">
                    <div class="percent-bar"></div>
                  </div>
                  <div class="percent-value">5.5%</div>
                </div>
                <div class="star-percent-bar">
                  <div class="star">
                    <img :src="StarImg" alt="">
                    <img :src="StarImg" alt="">
                  </div>
                  <div class="bar">
                    <div class="percent-bar"></div>
                  </div>
                  <div class="percent-value">4.5%</div>
                </div>
                <div class="star-percent-bar">
                  <div class="star">
                    <img :src="StarImg" alt="">
                  </div>
                  <div class="bar">
                    <div class="percent-bar"></div>
                  </div>
                  <div class="percent-value">14.5%</div>
                </div>
            </div>  
          </div>
          <div class="score-bottom">
            <span>{{movieDetail.videoName}}</span>
          </div>
        </div>
        <div class="introduction">
            <div class="title">
              <span>简介</span>
              <span>展开<i class="yo-ico">&#xf031;</i></span>
            </div>
            <div class="intro-content">
                <p>
                  {{movieDetail.dra}}
                </p>
            </div>
        </div>

        <div class="actors">
            <div class="title">
              <span>演职人员</span>
              <span>全部<i class="yo-ico">&#xf07f;</i></span>
            </div>
            <div class="actor-list">
                <ul>
                  <li>
                    <img src="http://p1.meituan.net/movie/750e1ee980b3f35661fa8bdad64129d125095.jpg@160w_224h_1e_1c" alt="">
                    <span>{{movieDetail.dir}}</span>
                    <span>导演</span>
                  </li>
                  <li>
                    <img src="http://p0.meituan.net/movie/71ff46c61eec5c792ad5648cd2776dfc38340.jpg@160w_224h_1e_1c" alt="">
                    <span>宋佳</span>
                    <span>饰 白兰</span>
                  </li>
                  <li>
                    <img src="http://p0.meituan.net/moviemachine/fb8f3e10473d35dedc23f6b1282ea40a28546.jpg@160w_224h_1e_1c" alt="">
                    <span>王昱</span>
                    <span>饰 王星星</span>
                  </li>
                  <li>
                    <img src="http://p0.meituan.net/moviemachine/1682480a9400f479772f2dcfc7b1dde1162980.jpg@160w_224h_1e_1c" alt="">
                    <span>王千源</span>
                    <span></span>
                  </li>
                  <li>
                    <img src="http://p0.meituan.net/moviemachine/fb8f3e10473d35dedc23f6b1282ea40a28546.jpg@160w_224h_1e_1c" alt="">
                    <span>王昱</span>
                    <span>导演</span>
                  </li>                 
                </ul>
            </div>
        </div>
        <div class="movie-photos">
            <div class="title">
              <span>视频剧照</span>
              <span>全部剧照<i class="yo-ico">&#xf07f;</i></span>
            </div>
            <div class="photos-list">
                <ul>
                  <li v-for="url in movieDetail.photos" :key="url">
                    <img :src="url | wh('420.279')" alt="">
                  </li>
                </ul>
            </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="to-share">
        <img :src="ShareImg" alt="">
      </div>
      <div class="ticket-btn">特惠购票</div>
    </footer>
  </div>
</template>

<script>
import ToApp from "components/ToApp"
import WatchedImg from "assets/watched.png"
import WashImg from "assets/wash.png"
import SmallLogo from "assets/smallLogo.png"
import StarImg from "assets/star.png"
import ShareImg from "assets/share.png"
import { get } from "utils/http"
export default {
  data () {
    return {
      WatchedImg,
      WashImg,
      SmallLogo,
      StarImg,
      ShareImg,
      movieDetail:{}
    }
  },
  components: {
    ToApp
  },
  async mounted () {
    let { id:movieId } = this.$route.params
    let result = await get({
      url:"/ajax/detailmovie",
      params:{
        movieId
      }
    })
    this.movieDetail = result.detailMovie
  }
}
</script>

<style lang="stylus" scoped>
.outter-wrap
  display flex
  flex-direction column
  background-color #575135
  height 100%
.content-wrap
  height 100%
  flex 1
  overflow-y scroll
footer
  height .6rem
  background #fff    
  border-top-left-radius .1rem
  border-top-right-radius .1rem
  display flex
  justify-content center
  align-items center
  .to-share
    height .19rem
    width .19rem
    margin-right .17rem
    img
      width 100%
      height 100%
  .ticket-btn
    height .44rem
    width 2.82rem
    background linear-gradient(-90deg,#fb3333,#ff5269)
    color #fff
    font-size .17rem
    border-radius .5rem
    text-align center
    line-height .44rem
.outter-wrap
  display flex
.title
  display flex
  justify-content space-between
  align-items center
  span:first-child
    font-size .15rem
  span:last-child
    font-size .12rem
    opacity .6
.content   
  padding: .21rem .16rem;
  color: #fff;
  .movie-box
    height 1.38rem
    display flex
    .movie-img
      height 1.38rem
      width 1rem
      img 
        height 100%
        width 100%
    .movie-msg
      flex 1
      margin-left .12rem
      .movie-name
        font-size .2rem
        line-height .3rem
        font-weight 700
      .movie-row
        font-size .12rem
        line-height .16rem
        opacity .6
      .pub-time
        margin-bottom .05rem
      .movie-check
        height .3rem
        display flex
        justify-content space-between
        .btn
          height .3rem
          width 1.1rem
          text-align center
          line-height .3rem
          background #928E7C
          border-radius .04rem
          img 
            height .14rem
            width .14rem
  .score-msg
    background-color #46412A
    padding .1rem .12rem
    margin-top .15rem
    border-radius .06rem
    .score-top
      display flex
      font-size .12rem
      justify-content space-between
      line-height .16rem
      img 
        width .14rem
        height .14rem
      >div:last-child
        font-size .1rem
        opacity .6
        span 
          font-size .11rem
        >span:last-child
          margin-left .1rem
    .score-middle
      height 1.12rem
      padding .2rem 0
      display flex
      justify-content center
      align-items center
      .score-box
        width .48rem
        height .55rem 
        text-align center 
        margin-right .2rem
        .score
          font-size .34rem 
          line-height .4rem
          color #ffb400
        .score-nm
          font-size .1rem
          opacity .6
      .score-detail
        width 1.75rem
      .star-percent-bar
        height .15rem
        display flex
        align-items center
        .star
          height .05rem
          width .35rem
          display flex
          justify-content flex-end
          opacity .6
          img 
            display block
            height .05rem
            width .05rem
            margin-left .01rem
        .bar
          height .05rem
          width 1rem
          background-color #928E7C
          margin 0 .05rem 0 .06rem
          .percent-bar
            background-color #ffb400
            width .64rem
            height 100%
        .percent-value
          height .15rem
          font-size .1rem
          opacity .6
    .score-bottom
      padding-top .1rem
      font-size .12rem
      color #ffe4a2
  .introduction
    padding-top .16rem
    .intro-content
      p
        font-size .15rem
        line-height .26rem
        text-align justify
        margin .07rem 0
  .actors
    margin .18rem 0 .15rem
    .actor-list
      margin-top .12rem
      overflow-x scroll
      ul
        display flex
        li
          width .82rem
          height 100%
          display flex
          flex-direction column
          text-align center
          font-size .12rem
          margin 0 .05rem
          img 
            width .82rem
            height 1.12rem
          span:last-child
            opacity .6
  .movie-photos
    margin-top .18rem
    .photos-list
      margin-top .11rem
      overflow-x scroll
      ul
        display flex 
        width max-content
        li
          width 1.4rem
          height .93rem
          margin 0 .08rem
          img 
            width 100%
            height 100%

</style>