<template>
<div v-if="checkList.brand">
    <div class="check-bar" >
        <div><span>全城</span><i class="yo-ico">&#xf033;</i></div>
        <div @click="showCheck"><span>{{checkList.brand.name}}</span><i class="yo-ico">&#xf033;</i></div>
        <div><span>特色</span><i class="yo-ico">&#xf033;</i></div>
    </div>
    <div class="check-content" v-show="isShow">
        <div class="check-brand check-box" >
          <li v-for="value in checkList.brand.subItems" :key="value.id"><span>{{value.name}}</span><i>{{value.count}}</i></li>
        </div>
    </div>
</div>

</template>

<script>

import { get } from "utils/http"
export default {
    data() {
      return {
       checkList:{},
       isShow:false
      }
    },
    methods: {
      showCheck(){
        this.isShow = !this.isShow
      }
    },
    async mounted () {
      let result  = await get({
        url:'/ajax/filterCinemas?ci=1'
      })
      // console.log(result)
      this.checkList = result
    }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl";
.check-bar
  height .4rem
  display flex
  background #fff
  $border(0 0 1px 0)
  >div
    line-height .4rem
    flex 1
    position relative
    display flex
    align-items center
    justify-content center
  >div::after
    content ""
    display block
    position absolute
    height .2rem
    top .1rem
    left 0
    border-left 1px solid #e8e8e8
  >div:nth-child(1)::after
    display none
.check-content
  position absolute
  height 100%
  width 100%
  z-index 1000
  background rgba(0,0,0,.6)
  .check-box
    overflow-y scroll
    background #fff
    height 3.45rem
    li 
      height .45rem
      $border(0 0 1px 0)
      margin-right .27rem
      padding 0 .15rem 0 .26rem
      display flex
      justify-content space-between
      align-items center
      color #333
</style>