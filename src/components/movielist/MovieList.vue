<template>
<div>
    <ul class="movie-list" v-if="type === 'intheater' && intheaterList.length > 0">
      <MovieItem
        v-for="(movie,index) in intheaterList" 
        :key="movie.id" 
        :movie="movie" 
        :index="index" 
      > 
      </MovieItem>
    </ul>
    <div class="movie-list"
      v-else-if="type === 'comingsoon' && tempList.length > 0"
      v-for="(item,key) in comingsoonList" 
      :key="key"
      >
      <p>{{key}}</p>
      <MovieItem
        v-for="(movie,index) in item"
        :key="movie.id" 
        :movie = "movie" 
        :index = "index"
      ></MovieItem>
    </div>
    <van-loading
     type="circular" 
     v-if="(type === 'intheater' && intheaterList.length === 0)||(type === 'comingsoon' && tempList.length === 0)"
     />

</div>
</template>

<script>
import MovieItem from "./MovieItem";  
import { get } from "utils/http";
import BScroll from 'better-scroll'
import _ from "lodash";
import Vue from 'vue';
import { Loading } from 'vant';
import store from "store"
Vue.use(Loading)
export default {
  props: ["type"],
  components: {
    MovieItem
  },
  data () {
    return {
      intheaterList:[],
      comingsoonList:{},
      tempList:[]
    }
  },
  // beforeCreate () {
  //   this.tempList = []
  // },
  //拼接数据
  joinData(result){
    if(this.type === "intheater"){
      if(result.coming.length === 0){
        this.intheaterList = result.movieList
      }
      this.intheaterList = [
        ...this.intheaterList,
        ...result.coming
      ]
    }else{
      this.tempList = [
        ...this.tempList,
        ...result.coming
      ]
      // console.log(this.tempList)
      //数据切片分组
      this.comingsoonList = _.groupBy(this.tempList, 'comingTitle')
      // console.log(this.comingsoonList)
    }
  },
  async mounted () {
      var url , offset
      let {id:cityId} = store.get("currentCity") || {id:1}
      // console.log(cityId)
      // console.log(this.type)
      //根据type 请求不同的的数据
      if(this.type === 'intheater'){
        url = '/ajax/movieOnInfoList'
        offset = 12
      }else{
        url = '/ajax/comingList'
        offset = 10
      }

      let result = await get({
        url,
        params:{
          token:'',
          ci : cityId,
          limit : 10
        }
      })
        // console.log(result)
      this.$options.joinData.call(this,result)
      // console.log(result)
      let movieIds = _.chunk(result.movieIds.slice(12),10)
      // console.log(movieIds)
     let bScroll = new BScroll('.list-wrapper',{
          probeType: 2,
          pullUpLoad:true,
          click:true
      })
      let page = 0
      bScroll.on('pullingUp', async() => {
      if (page < movieIds.length) {
        let result = await get({
          url: '/ajax/moreComingList',
          params: {
            token: '',
            movieIds: movieIds[page].join(',')
          }
        })

        this.$options.joinData.call(this,result)

        await this.$nextTick()
        bScroll.refresh()
        page++
        }else{
          console.log("没有数据了啊！！")
        } 
        bScroll.finishPullUp()
      })
      
      bScroll.on("scroll",()=>{
        this.$store.commit("setSticky",bScroll.y < -100)
      })
  }
}
</script>

<style lang="stylus" scoped>
.movie-list
    padding 0 .14rem
    p
      font-size .14rem
      padding-top .12rem
      line-height .14rem
.van-loading
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  margin auto
  width .5rem
  height .5rem
  

</style>
