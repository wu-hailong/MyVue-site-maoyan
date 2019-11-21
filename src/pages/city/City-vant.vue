<template>
  <section class="city-wrapper">
    <van-index-bar :index-list="indexList" :sticky ="false">
      <section class="city">
        <van-index-anchor index="定位" class="item-title">定位城市</van-index-anchor>
        <div class="city-items">
          <div class="city-item location-city">定位失败，请点击重试</div>
        </div>
      </section>
      <section class="city">
        <van-index-anchor index="最近" class="item-title">最近访问城市</van-index-anchor>
        <div class="city-items">
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
        </div>
      </section>
      <section class="city">
        <van-index-anchor index="热门" class="item-title">热门城市</van-index-anchor>
        <div class="city-items">
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
          <div class="city-item">上海</div>
        </div>
      </section>
      <section class="city">
        <div
        v-for="(citys,key) in cityList"
        :key="key"
        >
        <van-index-anchor :index="key" class="item-title letter-title">{{key}}</van-index-anchor>
        <div class="city-list">
          <div class="list-item"
            v-for="city in citys"
            :key="city.id"
          >
          {{city.nm}}
          </div>
        </div>
        </div>
      </section>
      <!-- <section class="city-nav">
        <div class="nav-item">定位</div>
        <div class="nav-item">最近</div>
        <div class="nav-item">热门</div>
        <div class="nav-letter">A</div>
        <div class="nav-letter">B</div>
      </section> -->
    </van-index-bar>
  </section>
</template>

<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor } from 'vant'
Vue.use(IndexBar).use(IndexAnchor)
import { get } from "utils/http"
import _ from "lodash"

export default {
  data () {
    return {
      cityList:{}
    }
  },
  created () {
      this.initIndexList =[
        '定位',
        '最近',
        '热门'
      ]
  },
  computed: {
    indexList(){
      return [
        ...this.initIndexList,
        ...Object.keys(this.cityList)
      ]
    }
  },
  async mounted () {
    let result = await get({
      url : "/dianying/cities.json"
    }) 
    // console.log(result)
    let chunkResult =  _.groupBy(result.cts, (value)=>{
        return value.py.substr(0,1).toUpperCase()
    });
    let reducedResult = Object.keys(chunkResult).sort().reduce((obj,key)=>{
      obj[key] = chunkResult[key]
      return obj
    },{})
    // console.log(chunkResult)
    // console.log(reducedResult)
    this.cityList = reducedResult
  }

}
</script>

<style lang="stylus" scoped>
.city-wrapper
  background #ebebeb
  padding-right .14rem
  height 100%
  overflow-y scroll
.item-title
  height .3rem
  line-height .3rem
  padding-left .15rem
.letter-title
  padding-left .25rem
.city-items
  background #f5f5f5
  display flex
  flex-wrap wrap
  padding 0 .3rem .08rem 0
  color #333
  .city-item
    background #fff
    width .96rem
    height .33rem
    margin-top .15rem
    margin-left .13rem
    padding 0 .04rem
    border 1px solid #e6e6e6
    border-radius .03rem
    line-height .33rem
    text-align center
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .location-city
    width auto
    padding 0 .2rem
.city-list
  background #f5f5f5
  padding-left .15rem
  padding-right .3rem
  .list-item
    height .45rem
    line-height .45rem
    border-bottom 1px solid #c8c7cc
  >div:last-child
    border-bottom:none
.city-nav
  position fixed
  right 0
  top 11vh
  width .35rem
  font-size .12rem
  text-align center
  .nav-letter
    width 15px
    margin-left 15px

</style>