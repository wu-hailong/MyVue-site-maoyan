<template>
  <div class="detail-wrap">
    <DetailTitle :movieDeatail="movieDeatail"></DetailTitle>
    <div class="scroll-content" v-if="cinemaList.movieId">
      <ToApp></ToApp>
      <MovieDeatil :movieDeatail="movieDeatail"></MovieDeatil>
      <div class="sticky-wrap">
          <DateBar :dateList='dateList'></DateBar>
          <CheckBar></CheckBar>
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
    <div v-else>
     <van-loading
      color="#1989fa" 
      type="circular" 
      /> 
     <van-skeleton
      title 
      :row="20" 
      />
    </div>
  </div>
</template>
<script>
import ToApp from "components/ToApp"
import MovieDeatil from "./movies/MovieDeatil"
import DetailTitle from "./DetailTitle"
import DateBar from "./cinemas/DateBar"
import CheckBar from "./cinemas/CheckBar"
import { post , get} from "utils/http"
import { stringify } from 'qs'
import Vue from 'vue';
import { Loading ,Skeleton } from 'vant';
Vue.use(Loading).use(Skeleton)
export default {
  components: {
    ToApp,
    MovieDeatil,
    DetailTitle,
    DateBar,
    CheckBar
  },
  data () {
    return {
      cinemaList:{},
      movieDeatail:{},
      dateList:{}
    }
  },
  async mounted (){
    let { id : movieId } = this.$route.params
    let detailResult = await get({
        url:'/ajax/detailmovie',
        params:{
          movieId
        }
      }) 
      // console.log(detailResult)
      this.movieDeatail = detailResult.detailMovie
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
      this.dateList = cinemaResult.showDays.dates
      this.cinemaList = cinemaResult 

    //  console.log(detailResult)
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl";
.van-loading
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  margin auto
  width .5rem
  height .5rem
.detail-wrap
  height 100% 
  overflow-y scroll
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