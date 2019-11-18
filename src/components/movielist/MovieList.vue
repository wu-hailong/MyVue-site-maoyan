<template>
<div>
    <ul class="movie-list" v-if="type === 'intheater' ">
      <MovieItem
        v-for="(movie,index) in intheaterList" 
        :key="movie.id" 
        :movie="movie" 
        :index="index" 
      > 
      </MovieItem>
    </ul>
    <div class="movie-list"
      v-else
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
</div>
</template>

<script>
import MovieItem from "./MovieItem";  
import { get } from "utils/http";
import BScroll from 'better-scroll'
import _ from "lodash";
export default {
  props: ["type"],
  components: {
    MovieItem
  },
  data () {
    return {
      intheaterList:[],
      comingsoonList:{}  
    }
  },
  beforeCreate () {
    this.tempList = []
  },
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
      this.comingsoonList = _.groupBy(this.tempList, 'comingTitle')
      // console.log(this.comingsoonList)
    }
  },
  async mounted () {
      var url , offset
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
          ci : 1,
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
          pullUpLoad:true
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
  }
}
</script>

<style lang="stylus" scoped>
.movie-list
    padding 0 .14rem
</style>
