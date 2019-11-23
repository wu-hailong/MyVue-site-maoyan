<template>
  <div class="detail-wrap">
    <div>  
      <Header>
        <i @click="handleClick" class="yo-ico" >&#xf07d;</i>{{movieDeatail.nm}}
      </Header>
      <div class="scroll-content" v-if="cinemamovieId">
        <ToApp></ToApp>
        <MovieDeatil :movieDeatail="movieDeatail"></MovieDeatil>
        <DateBar :dateList='dateList'></DateBar>
        <CheckBar></CheckBar>
        <div class="cinema-wrap">
          <ul class="cinema-list">
              <CinemaItem
                v-for="cinema in cinemaList"
                :key="cinema.id"
                :cinema="cinema"
              ></CinemaItem>
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
import Header from "components/Header";
import ToApp from "components/ToApp"
import MovieDeatil from "./movies/MovieDeatil"
import DateBar from "./cinemas/DateBar"
import CheckBar from "components/cinemas/CheckBar"
import CinemaItem from "components/cinemas/CinemaItem"
import { post , get} from "utils/http"
import { stringify } from 'qs'
import Vue from 'vue';
import { Loading ,Skeleton } from 'vant';
Vue.use(Loading).use(Skeleton)
import BScroll from 'better-scroll'
import store from "store"
export default {
  components: {
    Header,
    ToApp,
    MovieDeatil,
    DateBar,
    CheckBar,
    CinemaItem
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
    async getCinemaList({movieId,offset,day,cityId}){
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
              cityId
            })
          })
    },
    getDateString(){
        let year = new Date().getFullYear()
        let month = (new Date().getMonth() + 1)
        let day = new Date().getDate()
        return `${year}-${month}-${day}`
    },
    handleClick(){
      this.$router.back()   
    }
  },
  async mounted (){
    let { id : movieId } = this.$route.params
    let { id : cityId } = store.get("currentCity") || {id:1}
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
    let cinemaResult = await this.getCinemaList({movieId,offset,day,cityId})
    // console.log(cinemaResult)
    if(cinemaResult.showDays){
      this.dateList = cinemaResult.showDays.dates
    }
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