<template>
 <section class="list-wrapper">
     <div class="sroll-wrap">
        <RecentExpected></RecentExpected>     
        <div class="expected-list">
          <MovieList></MovieList>
        </div>
     </div>
 </section>
</template>

<script>
import MovieList from "components/movielist/MovieList";
import RecentExpected from "./RecentExpected";
export default {
   components: {
      MovieList,
      RecentExpected
   }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  overflow-y scroll
  flex 1
  background #f5f5f5
  .expected-list
    margin-top .1rem
    background #fff
</style>