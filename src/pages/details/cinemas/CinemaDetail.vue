<template>
  <div v-if="cinemaData.cinemaId" class="content-wrapper">
    <Header>
      <i @click="goBack" class="yo-ico" >&#xf07d;</i>
      <div>
        {{cinemaData.nm}}
      </div>
    </Header>
    <ToApp></ToApp>
    <CinemaLocation :cinemaData="cinemaData"></CinemaLocation>
    <div class="movies-wrap">
      <div class="container">
        <swiper class="wrapper"
        :options="swiperOption"
        ref="swiper"
        >
          <swiperSlide  v-for="(slide, index) in movieList" :key="index+slide">
            <div class="slide">
              <img :src="slide.img | wh(444.621)" alt="">
            </div>
          </swiperSlide>
        </swiper>
      </div>
    </div>
    <div class="title-content" >
      <div class="movie-title">
        {{movieList[currentIndex].nm}} 
        <span v-if="movieList[currentIndex].globalReleased && movieList[currentIndex].sc !== '0.0'"> 
          {{movieList[currentIndex].sc}}<i>分</i>
        </span>
        <span 
          v-else-if="movieList[currentIndex].globalReleased && movieList[currentIndex].sc === '0.0'"
          > 
          暂无评分
        </span>
        <span v-else> 
          {{movieList[currentIndex].wish}}<i>人想看</i>
        </span>
      </div>
      <div class="movie-time">{{movieList[currentIndex].desc}}</div>
    </div>
    <div class="nav-wrap">
      <ul>
        <li 
        :class="{active:index === checkedIndex}"
        v-for="(item,index) in movieList[currentIndex].shows"
        :key="item+index"
        @click="handleClick(index)"
        >
        {{item.dateShow}}
        </li>
      </ul>
    </div>
    <VipTop></VipTop>
    <div class="seat-wrap">
      <div class="no-seat" v-if="movieList[currentIndex].shows[checkedIndex].plist.length === 0">
        <div class="tips-box">
          <img :src="NoSeatImg" alt="">
          <div v-if="!movieList[currentIndex].shows[checkedIndex+1]">今日场次已映完</div>
          <div v-else>影片未上映</div>
        </div>
        <div class="to-next" 
        @click="toNext"
        v-if="movieList[currentIndex].shows[checkedIndex+1]"
        >
        点击查看{{movieList[currentIndex].shows[checkedIndex+1].dateShow.slice(2)}}场次
        </div>
      </div>
      <ul v-else>
        <li 
          v-for="(item,index) in movieList[currentIndex].shows[checkedIndex].plist"
          :key="item+index"
          >
          <div>
            <div class="play-time">
              <div class="start-time">{{item.tm}}</div>
              <div class="end-time">16:44散场</div>
            </div>
            <div class="play-site">
              <div>{{item.lang}} {{item.tp}}</div>
              <div class="hall">{{item.th}}</div>
            </div>
          </div>
          <div>
            <div class="ticket-price">
              <div class="price">￥<span>33</span> <span><i>折扣卡</i><i>￥{{item.vipPrice}}</i></span></div>
              <div class="ticket">{{item.extraDesc}}</div>
            </div>
            <div class="cash-btn">购票</div>
          </div>
        </li>
      </ul>
    </div>
   <DealList :dealList="dealList"></DealList>
  </div>
</template>

<script>
import Header from "components/Header"
import ToApp from "components/ToApp"
import { get } from "utils/http"
import NoSeatImg from "assets/noSeat.png"
import CinemaLocation from "./CinemaLocation"
import DealList from "./DealList"
import VipTop from "./VipTip"
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    Header,
    ToApp,
    swiper,
    swiperSlide,
    CinemaLocation,
    VipTop,
    DealList
  },
  data () {
    return {
      cinemaData:{},
      movieList:{},
      dealList:{},
      NoSeatImg,
      currentIndex:0,
      checkedIndex:0,
      swiperOption:{
          slidesPerView: 5,
          spaceBetween: 50,
          centeredSlides: true,
          on:{
             slideChangeTransitionEnd: ()=>{
              // console.log(this.$refs.swiper.swiper)
              let that = this.$refs.swiper.swiper//swiper的实例
              this.currentIndex = that.activeIndex
              this.checkedIndex = 0
            },
          }      
      }
    }
  },
  methods: {
    goBack(){
      this.$router.back()
    },
    handleClick(index){
      // console.log(index)
      this.checkedIndex = index
    },
    toNext(){
      this.checkedIndex ++
    }
  },
  async mounted () {
    let { id:cinemaId } = this.$route.params
    let result = await get({
      url:'/ajax/cinemaDetail',
      params:{
        cinemaId
      }
    })
    // console.log(result)
    this.cinemaData = result.cinemaData
    this.movieList = result.showData.movies
    this.dealList = result.dealList
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl";
//设置swiper的swiper-slide-active
.swiper-slide-active
  .slide 
    transform scale(1.2)
    border 2px solid #fff
    &::after
      content ""
      display block
      position absolute
      border-top .06rem #fff solid
      border-left .06rem transparent solid
      border-right .06rem transparent solid
      bottom -.06rem
      left 40%
.swiper-container
  overflow visible
.content-wrapper
  overflow-x scroll
  height 100%
.movies-wrap
  $border(0 0 1px 0)
  .container
    height 1.35rem
    background #40454d
    overflow hidden
    .wrapper
      padding 20px 0
      padding-left 5px
      padding-right 15px
      .slide
        height .95rem
        width .65rem !important
        transition transform .3s
        img 
          height 100%
          width 100%
.title-content
  padding .11rem .15rem   
  text-align center
  background #fff
  white-space nowrap
  .movie-title
    font-size .17rem
    color #333
    font-weight 700
    line-height .22rem
    overflow hidden
    text-overflow ellipsis
    span 
      color #ffb400
      font-size .16rem
      i 
        font-size .1rem
  .movie-time
    font-size .13rem 
    color #999
    line-height .19rem
    overflow hidden
    text-overflow ellipsis
.nav-wrap
  // height .65rem
  // padding-bottom .2rem
  background #FFF
  overflow-x scroll
  $border(1px 0 0 0)
  ul
    display flex
    width max-content
    li
      height .45rem
      text-align center
      line-height .45rem
      margin 0 .15rem
      &.active
        $border(0 0 2px 0,#f03d37)
        color #f03d37
.seat-wrap 
  background #fff
  .no-seat
    height 2.3rem
    background #f0f0f0
    display flex
    flex-direction column
    .tips-box
      margin .3rem auto 0
      text-align center
      >div
        margin-top .12rem
        line-height 1
        font-size .16rem
        color #acacac
      img
        width .77rem
        height .71rem
    .to-next
      margin .25rem auto 0
      border-radius .05rem
      width 1.70rem
      height .35rem
      line-height .35rem
      font-size .14rem
      color #f03d37
      border 1px solid rgba(0,0,0,.15)
      background-color #fff
      text-align center
  ul
    li
      padding .17rem .12rem
      display flex
      height .76rem
      color #777
      $border(0 0 1px 0)
      justify-content space-between
      >div
        display flex
        align-items center
        min-width 0
      .play-time
        width .55rem
        .start-time
          font-size .2rem
          line-height .2rem
          color #333
        .end-time
          font-size .11rem
          line-height .11rem
          margin-top .1rem
      .play-site
        margin-left .05rem
        flex 1
        white-space nowrap
        overflow hidden
        >div:first-child
          color #333
          line-height .16rem
          margin-top .07rem
          overflow hidden
          text-overflow ellipsis
        >div:last-child
          font-size .11rem
          line-height .16rem
          margin-top .07rem
          overflow hidden
          text-overflow ellipsis
      .ticket-price
        width 1.3rem
        margin-left .17rem
        .price
          display flex
          align-items center
          color #f03d37
          >span:first-child
            font-size .19rem
            color #f03d37
          >span:last-child
            font-size .10rem
            transform scale(.9)
            border-radius 2px
            border 1px #f90 solid
            i:first-child 
              background #f90
              color #fff
              padding .02rem 0
            i:last-child
              color #f90
        .ticket
          font-size .11rem
          margin-top .05rem
      .cash-btn
        width .45rem
        height .27rem
        text-align center
        line-height .27rem
        background #f03d37
        color #fff
        border-radius .04rem
        font-size .12rem

</style>