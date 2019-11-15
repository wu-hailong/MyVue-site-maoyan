<template>
    <div class="movies-wrapper">
        <header>猫眼电影</header>
        <nav>
          <div>
            <span>北京</span>
            <i class="yo-ico">&#xf033;</i>
          </div>
          <div>
            <router-link tag="li" to="/index/movies/intheater" active-class="active">正在热映</router-link>
            <router-link tag="li" to="/index/movies/comingsoon" active-class="active">即将上映</router-link>
          </div>
          <div>
            <i class="yo-ico">&#xf067;</i>
          </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>


export default {

}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl";
.movies-wrapper
  height 100%
  display flex
  flex-direction column
  header
    text-align center
    line-height .5rem
    height .5rem
    background #e54847
    color #fff
    font-size .18rem
  nav 
    height .44rem
    display flex
    $border(0 0 1px 0)
    font-size .15rem
    >div:first-child
       flex: 80;
       padding-left .15rem
       align-items center
       display flex
       color #666
    >div:nth-child(2)
      flex: 215;
      display flex
      li
        flex 1
        font-weight bold
        text-align center
        line-height .44rem
        margin 0 .12rem
        overflow hidden
        &.active
          color #e54847
          $border(0 0 4px 0,#e54847)
    >div:last-child
      flex: 80;
      padding-right .15rem
      display flex
      align-items center
      justify-content flex-end
      i  
        font-size .20rem
        color #e54847
        
        
</style>