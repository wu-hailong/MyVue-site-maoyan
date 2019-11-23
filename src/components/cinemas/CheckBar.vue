<template>
  <div class="check-bar">
    <!-- <div>
      <div>全城 <i class="yo-ico">&#xf033;</i></div>
      <div>品牌 <i class="yo-ico">&#xf033;</i></div>
      <div>特色 <i class="yo-ico">&#xf033;</i></div>
    </div> -->
    <div>
    <van-dropdown-menu
     :z-index="zIndex"
    >
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';
Vue.use(DropdownMenu).use(DropdownItem);
import { get } from "utils/http"
export default {
    data() {
      return {
        zIndex:999,
        value1: 0,
        value2: 'a',
        value3: 'A',
        option1: [
          { text: '全城', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 }
        ],
        option2: [
          { text: '品牌', value: 'a' },
          { text: '好评排序', value: 'b' },
          { text: '销量排序', value: 'c' },
        ],
        option3: [
          { text: '特色', value: 'A' },
          { text: '好评排序', value: 'B' },
          { text: '销量排序', value: 'C' },
        ]
      }
    },
    async mounted () {
      let result  = await get({
        url:'/ajax/filterCinemas?ci=1'
      })
      console.log(result)
    }
}
</script>

<style lang="stylus" scoped>
// @import "~assets/stylus/border.styl";
// .check-bar
//   height .4rem
//   display flex
//   background #fff
//   $border(0 0 1px 0)
//   >div
//     line-height .4rem
//     flex 1
//     position relative
//     display flex
//     align-items center
//     justify-content center
//   >div::after
//     content ""
//     display block
//     position absolute
//     height .2rem
//     top .1rem
//     left 0
//     border-left 1px solid #e8e8e8
//   >div:nth-child(1)::after
//     display none

</style>