<template>
  <div class="search-wrapper">
    <Header>
        <i @click="handleClick" class="yo-ico" >&#xf07d;</i>
        猫眼电影
    </Header>
    <div class="search-header">
      <div class="input-wrap">
          <i class="yo-ico">&#xf067;</i>
          <input v-model="inputValue" type="text" placeholder="搜影院" @input="handleInput" @blur="saveKeyWords">
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
    <div class="search-result" v-else>
        <h2>影院</h2>
        <CinemaItem
        v-for="cinema in searchList.cinemas.list"
        :key="cinema.id"
        :cinema="cinema"
        ></CinemaItem>
    </div>
  </div>
</template>

<script>
import Header from "components/Header";
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
      historyKeyWords:store.get("keyWords")||[]
    }
  },
  components: {
    Header,
    CinemaItem
  },
  mounted () {
   
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
      let { id:cityId} = store.get("currentCity") || {id:1}

      let result = await get({
            url:"/ajax/search",
            params:{
              kw:this.inputValue,
              cityId,
              stype:2
            }
          })
        this.searchList = result
    },500)
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl"
.search-wrapper
  background-color #f5f5f5
  height 100%
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
.search-result
  background #fff
  h2
    padding .09rem .15rem
    $border(0 0 1px 0)
    font-size .15rem
    color #999
    font-weight normal
</style>