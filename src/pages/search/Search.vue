<template>
  <div class="search-wrapper">
    <Header>
        <i @click="handleClick" class="yo-ico" >&#xf07d;</i>
        猫眼电影
    </Header>
    <div v-if="stype===2||-1" class="content-wrapper">
      <div class="search-header">
        <div class="input-wrap">
            <i class="yo-ico">&#xf067;</i>

            <input v-if="stype===2" v-model="inputValue" type="text" placeholder="搜影院" @input="handleInput" @blur="saveKeyWords">
            <input v-else v-model="inputValue" type="text" placeholder="搜电影,搜影院" @input="handleInput" @blur="saveKeyWords">

            <i class="yo-ico" v-if="inputValue !== ''" @click="clearInput">&#xf063;</i>
        </div>
        <div class="cancel" @click="handleClick()">取消</div>
      </div>
      <div class="search-history" v-if="!searchList.cinemas">
        <li v-for="(keyword,index) in historyKeyWords" :key="index">
          <img :src="SHImg" alt="">
          <span>{{keyword}}</span>
          <i class="yo-ico">&#xf077;</i>
        </li>
      </div>
      <div class="result-wrapper" v-else>
        <div class="search-result">
          <div v-if="stype!==2" class="movies-result">
            <h2>电影/电视剧/综艺</h2>
            <MovieItem
              v-for="(movie,index) in searchList.movies.list"
              :key="movie.id" 
              :movie = "movie" 
              :index = "index"
            ></MovieItem>
            <div class="result-total" v-if="searchList.movies.total > 3">
              查看全部{{searchList.movies.total}}部影视剧
            </div>
          </div>
          <div class="cinemas-result">
            <h2>影院</h2>
            <CinemaItem
            v-for="cinema in cinemaList" 
            :key="cinema.id"
            :cinema="cinema"
            ></CinemaItem>
            <div class="result-total" v-if="searchList.cinemas.total > 3">
              查看全部{{searchList.cinemas.total}}部影视剧
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "components/Header";
import MovieItem from "components/movielist/MovieItem"
import SHImg from "assets/searchHistory.png"
import CinemaItem from "components/cinemas/CinemaItem";
import { get } from "utils/http"
import _ from "lodash"
import store from "store"
export default {
  data () {
    return {
      SHImg,
      searchList:{},
      inputValue:"",
      historyKeyWords:store.get("keyWords")||[],
      stype:0 ,
      cinemaList:[]
    }
  },
  components: {
    Header,
    CinemaItem,
    MovieItem
  },
  mounted () {
    let { stype } = this.$route.params
    this.stype = ~~stype
  },
  methods: {
    handleClick(){
      this.$router.back()
    },
    clearInput(){
      this.inputValue = ''
    },
    saveKeyWords(){
      if(this.inputValue !== ''){
        this.historyKeyWords.unshift(this.inputValue)
        if(this.historyKeyWords.length > 3){
          this.historyKeyWords.splice(2,1)
        }
        store.set("keyWords",this.historyKeyWords)
      }
    },
    handleInput:_.debounce(async function(){
      let { id:cityId } = store.get("currentCity") || {id:1}
      let result = await get({
            url:"/ajax/search",
            params:{
              kw:this.inputValue,
              cityId,
              stype:this.stype
            }
          })
        this.searchList = result
        if(result.cinemas){
          this.cinemaList = result.cinemas.list.splice(0,3)
        }
    },500)
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl"
.search-wrapper
  background-color #f5f5f5
  height 100%
  display flex
  flex-direction column
.content-wrapper
  height 100%
  flex 1
  display flex
  flex-direction column
.search-header
  height .47rem
  padding .08rem .1rem
  display flex
  $border(0 0 1px 0)
  .cancel
    width .42rem
    padding-left .1rem
    line-height .31rem
    font-size 16px
    color #f03d37
  .input-wrap
    background #fff
    border-radius .05rem
    border 1px solid #e6e6e6
    height .3rem
    color #b2b2b2
    flex 1
    display flex
    align-items center
    padding-left .1rem
    input
      border none
      font-size .13rem
      height 100%
      flex 1
    i 
      font-size .15rem
      font-weight 700
      margin-right .05rem
.search-history
  padding-left .15rem
  background #fff
  li
    height .44rem
    $border(0 0 1px 0)
    display flex
    align-items  center
    img 
      height .15rem
      width .15rem
    span
      flex 1
      margin-left .1rem
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    i 
      padding .1rem .15rem
.result-wrapper
  overflow-y scroll
  flex 1
.search-result
  h2
    padding .09rem .15rem
    $border(0 0 1px 0)
    font-size .15rem
    color #999
    font-weight normal
.movies-result
  padding 0 .15rem
  background #fff
  margin-bottom .1rem
.cinemas-result
  background #fff
.result-total
  font-size: 15px;
  color: #ef4238;
  line-height: 44px;
  height: 44px;
  text-align: center;
</style>