<template>
  <section class="list-wrapper">
    <ul class="movie-list">
      <MovieItem
        v-for="(movie,index) in movieList" 
        :key="movie.id" 
        :movie="movie" 
        :index="index" 
      > 
      </MovieItem>
    </ul>
  </section>
</template>

<script>
import MovieItem from "./MovieItem";  
import { get } from "utils/http";
import BScroll from 'better-scroll'
import _ from "lodash";
export default {
  components: {
    MovieItem
  },
  data () {
    return {
      movieList:[]  
    }
  },
  async mounted () {
      let result = await get({
        url:'/ajax/movieOnInfoList?token='
      })
      this.movieList = result.movieList
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

        this.movieList = [
          ...this.movieList,
          ...result.coming
        ]

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
@import '~assets/stylus/border.styl';
.list-wrapper
  flex 1
  overflow hidden
  .movie-list
    padding 0 .14rem
</style>
