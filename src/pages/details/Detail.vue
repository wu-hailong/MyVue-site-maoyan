<template>
  <div class="detail-wrap">
    <div class="scroll-content">
      <header><router-link tag="i" to="/" class="yo-ico" >&#xf07d;</router-link>决战中途岛</header>
      <ToApp></ToApp>
      <div class="detail-box">
        <div class="movie-img">
          <img :src="movieDeatail.img | wh('256.360')" alt="">
        </div>
        <div class="movie-detail">
          <div class="movie-title">{{movieDeatail.nm}}</div>
          <div class="e-title">{{movieDeatail.enm}}</div>
          <div class="movie-score">{{movieDeatail.sc}} <span>({{movieDeatail.snum}}人评)</span></div>
          <div class="movie-type">{{movieDeatail.cat}}</div>
          <div class="movie-time">{{movieDeatail.src}}/{{movieDeatail.dur}}分钟</div>
          <div class="public-time">{{movieDeatail.pubDesc}}</div>
        </div>
        <div class="cover-box"></div>
        <!-- <div class="cover-img" :style="{'background-image':'url(movieDeatail.img | wh(`148.208`))'}">
        </div> -->
        <i class="yo-ico">&#xf07f;</i>
      </div>
      <div class="sticky-wrap">
        <ul class="date-bar">
          <li class="active">今天11月19日</li>
          <li v-for="time in cinemaList.showDays.dates" :key="time">{{time.date}}</li>
          <!-- <li>今天11月19日</li>
          <li>今天11月19日</li>
          <li>今天11月19日</li>
          <li>今天11月19日</li> -->
        </ul>
        <div class="check-bar">
            <div>全城 <i class="yo-ico">&#xf033;</i></div>
            <div>品牌 <i class="yo-ico">&#xf033;</i></div>
            <div>特色 <i class="yo-ico">&#xf033;</i></div>
        </div>
      </div>
      <div class="cinema-wrap">
        <ul class="cinema-list">
            <li v-for="cinema in cinemaList.cinemas" :key="cinema.id">
              <div class="cinema">
                <div class="cinema-name">
                  <span>{{cinema.nm}}</span>
                  <span>{{cinema.sellPrice}}<i>元起</i></span>
                </div>
                <div class="cinema-address">
                  <span>{{cinema.addr}}</span>
                  <span>{{cinema.distance}}</span>
                </div>
                <div class="cinema-label">
                  <span>退</span>
                  <span>改签</span>
                  <span class="vip-tag">小吃</span>
                  <span class="vip-tag">折扣卡</span>   
                </div>
                <div class="cinema-discount" v-if="cinema.promotion">
                  {{cinema.promotion.cardPromotionTag}}
                </div>
              </div>
              <div class="show-times">近期场次 : 19:10 20:35 21:45</div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>
moviemachine
<script>
import ToApp from "components/ToApp"
import { post , get} from "utils/http"
import { stringify } from 'qs'
export default {
  components: {
    ToApp
  },
  data () {
    return {
      cinemaList:[],
      movieDeatail:[]
    }
  },
  async mounted () {

    let { id : movieId } = this.$route.params
    console.log()
    let detailResult = await get({
        url:'/ajax/detailmovie',
        params:{
          movieId
        }
      }) 
      this.movieDeatail = detailResult.detailMovie
      // console.log(this.movieDeatail)
     let cinemaResult = await post({
       url:`/ajax/movie?forceUpdate=${Date.now()}`,
       headers:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
       data:stringify({
          movieId,
          day: '2019-11-21',
          offset: 0,
          limit: 20,
          districtId: -1,
          lineId: -1,
          hallType: -1,
          brandId: -1,
          serviceId: -1,
          areaId: -1,
          stationId: -1,
          item:"",
          updateShowDay: true,
          reqId: 1574171645589,
          cityId: 1,
       })
     })
     console.log(cinemaResult)
      this.cinemaList = cinemaResult
    

    //  console.log(detailResult)
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl";
.detail-wrap
  height 100% 
  overflow-y scroll
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
.date-bar
  height .45rem
  display flex
  background #fff
  overflow-x scroll
  li
    min-width 1.15rem
    text-align center
    line-height .45rem
    font-size .14rem
    color #666
    margin 0 .04rem
    &.active
      border-bottom: 2px solid #f03d37;
      color: #f03d37;
.check-bar
  height .4rem
  display flex
  background #fff
  >div
    line-height .4rem
    flex 1
    text-align center
.cinema-wrap
  height 100%
  background #fff
  .cinema-list
    height 100%
    color #777
    li
      padding .13rem .15rem
      // height 1.41rem
      $border(0 0 1px 0)
      .cinema
        // height .94rem
        .cinema-name
          font-size .16rem
          color #000
          line-height .24rem
          height .24rem
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          >span:last-child
            color:#f03d37
            margin-left .25rem
            i 
              font-size .12rem
        .cinema-address
          margin-top .05rem
          font-size .13rem
          line-height .2rem
          color #666
          display flex
          justify-content space-between
          >span:first-child
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .cinema-label
          font-size .1rem
          margin .05rem 0
          >span 
            padding 0 .03rem
            margin-right .05rem
            color #589daf
            $border(1px 1px 1px 1px,#589daf)
          .vip-tag
            color #f90;
            $border(1px 1px 1px 1px,#f90) 
        .cinema-discount
          color #999
          font-size .11rem
      .show-times
        color #999
        font-size .12rem


  
</style>