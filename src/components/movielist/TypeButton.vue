<template>
  <div class="btn" 
    :class="{
      'blue-btn':movie.showst === 4,
      'yellow-btn':movie.showst === 1
    }"
  >
    {{movie.showst === 4 ? '预售' : movie.showst === 3 ? '购票' : '想看'}}
  </div>
</template>

<script>
export default {
  props: ['movie']
}
</script>

<style>

</style>