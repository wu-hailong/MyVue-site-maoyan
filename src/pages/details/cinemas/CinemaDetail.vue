<template>
  <div v-if="cinemaDetail.cinemaData">
    <Header>
      <i @click="goBack" class="yo-ico" >&#xf07d;</i>{{cinemaDetail.cinemaData.nm}}
    </Header>
    <ToApp></ToApp>
    <div class="cinema-location">
      <div class="location-wrap">
        <div class="cinema-nm">{{cinemaDetail.cinemaData.nm}}</div>
        <div class="location">{{cinemaDetail.cinemaData.addr}}</div>
      </div>
      <div class="location-icon">
        <img :src="LocationIcon" alt="">
      </div>
    </div>
    <div class="movies-wrap">
      <div class="container">
        <swiper class="wrapper"
        :options="swiperOption"
        >
          <swiperSlide  v-for="(slide, index) in cinemaDetail.showData.movies" :key="index">
            <div class="slide">
              <img :src="slide.img | wh(444.621)" alt="">
            </div>
          </swiperSlide>
        </swiper>
      </div>
      <div class="content">
        <div class="movie-title">冰雪奇缘2 <span>9.0<i>分</i></span></div>
        <div class="movie-time">104分钟 | 喜剧 | 克里斯汀·贝尔</div>
      </div>
    </div>
    <div class="nav-wrap">
      <ul>
        <li>今天11月25日</li>
      </ul>
      <div class="vip-tips">
        <div>折扣卡</div>
        <div>现在开卡，首单2张最高立减6元</div>
        <div>20元起开卡</div>
      </div>
    </div>
    <div class="seat-wrap">
      <ul>
        <li>
          <div>
            <div class="play-time">
              <div class="start-time">15:00</div>
              <div class="end-time">16:44散场</div>
            </div>
            <div class="play-site">
              <div>原版 3D</div>
              <div class="hall">2号激光厅</div>
            </div>
          </div>
          <div>
            <div class="ticket-price">
              <div class="price">￥33 <span><i>折扣卡</i><i>￥28</i></span></div>
              <div class="ticket">折扣卡首单特惠</div>
            </div>
            <div class="cash-btn">购票</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "components/Header"
import ToApp from "components/ToApp"
import { get } from "utils/http"
import LocationIcon from "assets/location.png"
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    Header,
    ToApp,
    swiper,
    swiperSlide
  },
  data () {
    return {
      cinemaDetail:{},
      LocationIcon,
      swiperOption:{
          slidesPerView: 5,
          spaceBetween: 50,
          centeredSlides: true,
      }
    }
  },
  methods: {
    goBack(){
      this.$router.back()
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
    console.log(result)
    this.cinemaDetail = result
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
.movies-wrap
  $border(0 0 1px 0)
  .container
    height 1.35rem
    background #40454d
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
  .content
    padding .11rem .15rem   
    text-align center
    background #fff
    .movie-title
      font-size .17rem
      color #333
      font-weight 700
      line-height .22rem
      span 
        color #ffb400
        font-size .16rem
        i 
          font-size .1rem
    .movie-time
      font-size .13rem 
      color #999
      line-height .19rem
.nav-wrap
  // height .65rem
  // padding-bottom .2rem
  background #FFF
  ul
    display flex
    li
      height .45rem
      text-align center
      line-height .45rem
      margin 0 .15rem
  .vip-tips
    height .42rem
    background #fff5ea
    display flex
    align-items center
    padding 0 .15rem
    >div:first-child
      background #ff941a
      text-align center
      line-height .15rem
      width .34rem
      height .15rem
      font-size .1rem
      color #fff
      border-radius .02rem
    >div:nth-child(2)
      margin-left .1rem
      color #fa9600
      font-size .12rem
      flex 1
    >div:last-child
      font-size .12rem
      color #999
      width .7rem
.seat-wrap 
  background #fff  
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
        width .96rem
        margin-left .05rem
        >div:first-child
          color #333
          line-height .16rem
        >div:last-child
          font-size .11rem
          line-height .16rem
          margin-top .07rem
      .ticket-price
        width 1.3rem
        margin-left .17rem
        .price
          font-size .19rem
          color #f03d37
          display flex
          align-items center
          >span
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