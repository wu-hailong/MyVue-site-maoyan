<template>
   <section class="list-wrapper">
            <MovieList></MovieList>
   </section>
</template>

<script>
import MovieList from "components/movielist/MovieList";
export default {
   components: {
      MovieList
   }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  flex 1
  overflow hidden
</style>