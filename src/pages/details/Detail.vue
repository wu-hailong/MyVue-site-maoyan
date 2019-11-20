<template>
  <div class="detail-wrap">
    <div>  
      <DetailTitle :movieDeatail="movieDeatail"></DetailTitle>
      <div class="scroll-content" v-if="cinemamovieId">
        <ToApp></ToApp>
        <MovieDeatil :movieDeatail="movieDeatail"></MovieDeatil>
        <DateBar :dateList='dateList'></DateBar>
        <CheckBar></CheckBar>
        <div class="cinema-wrap">
          <ul class="cinema-list">
              <Cinema
                v-for="cinema in cinemaList"
                :key="cinema.id"
                :cinema="cinema"
              ></Cinema>
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
  </div>
</template>
<script>
import ToApp from "components/ToApp"
import MovieDeatil from "./movies/MovieDeatil"
import DetailTitle from "./DetailTitle"
import DateBar from "./cinemas/DateBar"
import CheckBar from "./cinemas/CheckBar"
import Cinema from "components/Cinema"
import { post , get} from "utils/http"
import { stringify } from 'qs'
import Vue from 'vue';
import { Loading ,Skeleton } from 'vant';
import BScroll from 'better-scroll'
Vue.use(Loading).use(Skeleton)
export default {
  components: {
    ToApp,
    MovieDeatil,
    DetailTitle,
    DateBar,
    CheckBar,
    Cinema
  },
  data () {
    return {
      cinemaList:{},
      cinemamovieId:null,
      movieDeatail:{},
      dateList:{}
    }
  },
  methods: {
    async getCinemaList({movieId,offset,day}){
      return await post({
            url:`/ajax/movie?forceUpdate=${Date.now()}`,
            headers:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            data:stringify({
              movieId,
              day,
              offset,
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
    },
    getDateString(){
        let year = new Date().getFullYear()
        let month = (new Date().getMonth() + 1)
        let day = new Date().getDate()
        return `${year}-${month}-${day}`
    }
  },
  async mounted (){
    let { id : movieId } = this.$route.params
    let offset = 0
    let day
    let detailResult = await get({
        url:'/ajax/detailmovie',
        params:{
          movieId
        }
      }) 
      // console.log(detailResult)
    this.movieDeatail = detailResult.detailMovie
    //判断电影是否上映
    if(this.movieDeatail.globalReleased){
      day = this.getDateString()
    }else{
      day = this.movieDeatail.rt
    }
    let cinemaResult = await this.getCinemaList({movieId,offset,day})
    // console.log(cinemaResult)
    this.dateList = cinemaResult.showDays.dates
    this.cinemaList = cinemaResult.cinemas 
    this.cinemamovieId = cinemaResult.movieId
      //  console.log(detailResult)
    let bScroll = new BScroll('.detail-wrap',{
          probeType: 2,
          pullUpLoad:true,
          click:true
    })
    bScroll.on("pullingUp",async ()=>{
      offset += 20
        let result = await this.getCinemaList({movieId,offset})
        if(result.cinemas.length!==0){
          this.cinemaList = [
            ...this.cinemaList,
            ...result.cinemas
          ]
          // console.log(this.cinemaList) 
          await this.$nextTick()
          bScroll.refresh()
          bScroll.finishPullUp()
        }else{
          console.log("没有了数据了")
        }
    })
  }
}
</script>

<style lang="stylus" scoped>
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
  // overflow-y scroll
.cinema-wrap
  height 100%
  background #fff
  .cinema-list
    height 100%
    color #777
</style>