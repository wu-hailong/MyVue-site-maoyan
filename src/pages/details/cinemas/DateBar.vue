<template>
      <ul class="date-bar">
          <li 
          v-for="time in dateList" 
          :key="time.date"
          @click="handleClick"
          :date="time.date"
          >{{time.date}}</li>        
        <!-- <li>今天11月19日</li> -->
      </ul>
</template>

<script>
export default {
  props: ["dateList"],
  methods: {
    // formatDate(){

    // }
    handleClick(){
      console.log(1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.date-bar
  height .45rem
  display flex
  background #fff
  overflow-x scroll
  li
    min-width 1.15rem
    text-align center
    line-height .45rem
    font-size .14rem
    color #666
    margin 0 .04rem
    &.active
      border-bottom: 2px solid #f03d37;
      color: #f03d37;

</style>