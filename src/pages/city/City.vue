<template>
  <section class="city-wrapper">
      <van-skeleton
      title 
      :row="25"
      :loading="hotCities.length === 0"
      >
        <div class="scroll-wrapper">
          <section class="city">
            <div class="item-title" ref="location">定位城市</div>
            <div class="city-items">
              <div class="city-item location-city">定位失败，请点击重试</div>
            </div>
          </section>
          <section class="city">
            <div class="item-title"  ref="history">最近访问城市</div>
            <div class="city-items">
              <div class="city-item"
              v-for="city in historyCities"
              :key="city.id"
              @click="pickCity(city.id,city.nm)"         
              >
              {{city.nm}}
              </div>
            </div>
          </section>
          <section class="city">
            <div class="item-title"  ref="hot">热门城市</div>
            <div class="city-items">
              <div class="city-item"
              v-for="city in hotCities"
              :key="city.id" 
              @click="pickCity(city.id,city.nm)"
              >
              {{city.nm}}
              </div>
            </div>
          </section>
          <section class="city">
            <div
            v-for="(cities,key) in cityList"
            :key="key"
            >
              <div :ref="key" class="item-title letter-title">{{key}}</div>
              <div class="city-list">
                <div class="list-item"
                v-for="city in cities"
                :key="city.id" 
                @click="pickCity(city.id,city.nm)"
                >
                {{city.nm}}
                </div>
              </div>
            </div>
          </section>
        </div>
        <section class="city-nav">
          <div class="nav-item"
          v-for="value in navTopThree"
          :key="value.id"
          @click="ClickTopThree(value.id)"
          >
          {{value.nm}}
          </div>
          <div class="nav-letter"
          v-for="letter in indexList"
          :key="letter"
          @touchmove="handleTouchMove"
          @click="ClickLetter(letter)" 
          :ref="letter"
          >
          {{letter}}
          </div>
        </section>
    </van-skeleton>
  </section>
</template>

<script>

import { get } from "utils/http"
import BScroll from "better-scroll"
import _ from "lodash"
import store from "store"
import Vue from 'vue';
import { Skeleton } from 'vant';
Vue.use(Skeleton)
export default {
  data () {
    return {
      cityList:{},
      hotCities:[],
      navTopThree:[
        { nm:'定位',
          id:'location'
        },
        { nm:'最近',
          id:'history'
        },
        {
          nm:'热门',
          id:'hot'
        }
      ]
    }
  },
  created () {
    this.bScroll = null,
    this.a_top = 0,
    this.letterHeight = 0
    this.letters = []
    this.historyCities = store.get('historyCities')
  },
  computed: {
    indexList(){
      return [
        ...Object.keys(this.cityList)
      ]
    }
  },
  methods: {
                      /*节流*/
    handleTouchMove: _.throttle(function(e){
      let clientY = e.touches[0].clientY
      // console.log(clientY)
      // console.log(this.a_top)
      let height = clientY - this.a_top
      let index = Math.floor(height/this.letterHeight)
      // console.log(index)
      if(index > -1 && index < this.letters.length){
          let target = this.$refs[this.letters[index]][0]
          // console.log(target)
          this.bScroll.scrollToElement(target)
      }
    },100),
    ClickTopThree(id){
        let target = this.$refs[id]
        this.bScroll.scrollToElement(target)
    },
    ClickLetter(id){
        let target = this.$refs[id][0]
        this.bScroll.scrollToElement(target)
    },
    //点击选择城市
    pickCity(id,nm){
      // console.log(id,nm)
      let cities = store.get('historyCities') || []
      cities.unshift({
        id,
        nm
      })
      if(cities.length > 3){
        cities.splice(2,1)
      }
      store.set("historyCities",_.uniqBy(cities,(value)=>{
        return value.id
      }))
      store.set("currentCity",{
        id,
        nm
      })
      this.$store.dispatch('cities/saveCity',{id,nm})
      this.$router.back()
    }
  },
  async mounted () {
    let result = await get({
      url : "/dianying/cities.json"
    }) 
    //生成11个随机城市
    this.hotCities =  _.sampleSize(result.cts,11)

    //根据拼音首字母分组
    let chunkResult =  _.groupBy(result.cts, (value)=>{
        return value.py.substr(0,1).toUpperCase()
    });

    //将分组后的数据按字母排序
    this.letters = Object.keys(chunkResult).sort()
    let reducedResult = this.letters.reduce((obj,key)=>{
      obj[key] = chunkResult[key]
      return obj
    },{})
    this.cityList = reducedResult
    // console.log(this.indexList)
    await this.$nextTick()
    this.bScroll = new BScroll(".city-wrapper",{
      click:true
    })
    let { top , height } = this.$refs['A'][1].getBoundingClientRect()
    // console.log(top , height)
    // console.log(this.$refs['A'])
    this.a_top = top
    this.letterHeight = height
    // console.log(store.get("historyCities"))
  }

}
</script>

<style lang="stylus" scoped>
.city-wrapper
  background #ebebeb
  padding-right .14rem
  height 100%
  // overflow-y scroll
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