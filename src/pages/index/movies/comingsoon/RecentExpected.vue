<template>
    <div class="expected-wrap">
      <p>近期最受期待</p>
      <div class="expected-content">
        <div class="item-wrapper">
        <div class="expected-item" 
          v-for="movie in comingList" 
          :key="movie.id" 
        >
          <div class="expected-img">
            <img :src="movie.img  | wh('256.360')" alt="">
          </div>
          <div class="expected-title">{{movie.nm}}</div>
          <div class="time">{{movie.comingTitle}}</div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import { get } from "utils/http";
import BScroll from "better-scroll"
export default {
    data () {
      return {
        comingList:[]
      }
    },
    beforeCreate () {
      this.limit = 10
      this.isLoaded = true

    },
    methods: {
      async loadData(page){
        return await get({
          url:"/ajax/mostExpected",
          params:{
            ci:1,
            limit:this.limit,
            offset:page * this.limit,
            token:''

          }
        })
      }
    },
    async mounted () {
      let page = 0
      let firstPage = await this.loadData(page)
      // console.log(result)
      this.comingList = firstPage.coming
      let bScroll = new BScroll(".expected-content",{
          scrollX:true
      })
      bScroll.on('scrollEnd', async ()=>{
        let { x , maxScrollX } = bScroll
        // console.log(x,maxScrollX)
        if(x <= maxScrollX && this.isLoaded){

          this.isLoaded =false//阻止用户第一次请求还没结束 就进行第二次请求
          page ++
          let nextPage = await this.loadData(page)
          this.comingList = [
            ...this.comingList,
            ...nextPage.coming
          ]
          await this.$nextTick()
          bScroll.refresh()
          this.isLoaded = true
        }
      })
    }
}
</script>

<style lang="stylus" scoped>
.expected-wrap
  background #fff
  height 2.16rem
  padding .12rem .15rem .12rem
  p
    font-size .14rem
    line-height .14rem
    color #333
    margin-bottom .12rem
  .expected-content
    overflow hidden
    .item-wrapper
      white-space nowrap 
      width max-content //元素宽度为内容的宽度
      .expected-item
        display inline-block
        width .85rem 
        margin-right .1rem
        .expected-img
          height 1.15rem
          img 
            width 100%
            height 100%
        .expected-title
          font-size .13rem
          color #222
          font-weight bold
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .time
          font-size .12rem
          color #999
          line-height .16rem
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
</style>