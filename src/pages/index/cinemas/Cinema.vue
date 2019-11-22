<template>
  <div class="cinema-content">
    <Header>影院</Header>
    <SearchBar></SearchBar>
    <CheckBar></CheckBar>
    <div class="cinema-wrap">
      <ul class="cinema-list">
          <CinemaItem
            v-for="cinema in cinemaList"
            :key="cinema.id"
            :cinema="cinema"
          ></CinemaItem>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "components/Header";
import SearchBar from "./SearchBar"
import CheckBar from "components/cinemas/CheckBar";
import CinemaItem from "components/cinemas/CinemaItem";
import store from "store"
import { get } from "utils/http"
import { stringify } from "qs"
import BScroll from "better-scroll"
export default {
  components: {
    Header,
    CheckBar,
    SearchBar,
    CinemaItem
  },
  data() {
    return {
      cinemaList: []
    };
  },
  methods: {
    async getCinemaList({ offset, day, cityId }) {
      return await get({
        url: '/ajax/cinemaList',  
        params:{
          day,
          offset,
          limit: 20,
          districtId: -1,
          lineId: -1,
          hallType: -1,
          brandId: -1,
          serviceId: -1,
          areaId: -1,
          stationId: -1,
          item:"",
          updateShowDay: true,
          reqId: 1574388316378,
          cityId
        }
      });
    },
    getDateString(){
        let year = new Date().getFullYear()
        let month = (new Date().getMonth() + 1)
        let day = new Date().getDate()
        return `${year}-${month}-${day}`
    }
  },
  async mounted() {
    let { id: cityId } = store.get("currentCity") || {id : 1};
    let day = this.getDateString()
    let offset = 0
    let cinemaResult = await this.getCinemaList({
      offset,
      day,
      cityId
    });
    this.cinemaList = cinemaResult.cinemas;
    let bScroll = new BScroll(".cinema-wrap",{
          probeType: 2,
          pullUpLoad:true,
          click:true
    })
    bScroll.on('pullingUp',async()=>{
      offset += 20 
      let result = await this.getCinemaList({
        offset
      })
      if(result.cinemas.length !==0){
        this.cinemaList = [
          ...this.cinemaList,
          ...result.cinemas
        ]
        await this.$nextTick()
        bScroll.refresh()
      }
      bScroll.finishPullUp()
    })
  }
};
</script>

<style lang="stylus" scoped>
.cinema-content
  height 100%
  display flex
  flex-direction  column
.cinema-wrap
  overflow-y scroll
  height 100%
  flex 1
</style>