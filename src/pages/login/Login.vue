<template>
  <div class="login-content">
    <Header>
      <i @click="goBack" class="yo-ico" >&#xf079;</i>
      猫眼电影
    </Header>
    <div class="login-wrap">
      <div class="check-bar">
        <div @click="changeLogin('UserNumber')" :class="{active:loginType ==='UserNumber'}">美团账号登录</div>
        <div @click="changeLogin('PhoneNumber')" :class="{active:loginType ==='PhoneNumber'}">手机验证登录</div>
      </div>
      <div class="login-form">
        <div>
          <input type="text" placeholder="账户名/手机号/Email" v-if="loginType ==='UserNumber'">
          <div  v-if="loginType ==='PhoneNumber'">
            <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phoneNumber">
            <button type="button" class="send-code" :disabled="!(phoneNumber.length === 11 && /^1[3456789]\d{9}$/.test(phoneNumber))">
              发送验证码
            </button>
          </div>
        </div>
        <div>
          <input type="password" placeholder="请输入您的密码"  v-if="loginType ==='UserNumber'">
          <input type="password" placeholder="请输入短信验证码" v-if="loginType ==='PhoneNumber'"
           :disabled="!(phoneNumber.length === 11 && /^1[3456789]\d{9}$/.test(phoneNumber))">
        </div>
      </div>
      <div class="btn-wrap">
          <button class="login-btn" 
          :disabled="!(phoneNumber.length === 11 && /^1[3456789]\d{9}$/.test(phoneNumber))"
          :isdisabled="loginType ==='PhoneNumber' && !(phoneNumber.length === 11 && /^1[3456789]\d{9}$/.test(phoneNumber))"
          >
          登录
          </button>
      </div>
      <div class="subline">
        <div>立即注册</div>
        <div>找回密码</div>
      </div>
      <footer>
        &copy; 猫眼电影 客服电话：
        <span>400-670-5335</span>
      </footer>
    </div>

  </div>
</template>

<script>
import Header from "components/Header"

export default {
  data () {
    return {
        loginType:"UserNumber",
        phoneNumber:'',
        
    }
  },
  components: {
    Header
  },
  methods: {
    goBack(){
      this.$router.back()
    },
    changeLogin(type){
      this.loginType = type
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~~assets/stylus/border.styl"
.login-content
  background #f8f8f8
  height 100%
i.yo-ico
  font-size .4rem
  transform rotate(-90deg)
.login-wrap
  .check-bar
    background #fff
    height .4rem
    display flex
    justify-content space-between
    color #222
    $border(0 0 8px 0, #d6d6d6)
    >div
      text-align center
      flex 1
      line-height .4rem
      font-size .12rem
      &.active
        $border(0 0 8px 0, #FFC300)
        &::after
          z-index 1000
    >div:first-child
      margin-left .2rem
    >div:last-child
      margin-right .2rem
  .login-form
    background #fff
    font-size .15rem
    >div
      height .44rem
      padding .07rem .1rem
      $border(0 0 1px 0)
      input 
        width 100%
        height 100%
        border none
        padding 0 .02rem
        border-radius .03rem
        &:focus
          background #ececec
      input[disabled]
        background #ececec
      >div 
        height 100%
        display flex
        button[disabled]
          background #dcdcdc
          color #999
          border none 
        .send-code
          width 1rem
          background #fff
          border: .01rem solid #df2d2d
          color #df2d2d
          margin-left .1rem
          font-size .14rem
          line-height .3rem
          border-radius .03rem
        input 
          flex 1
  .btn-wrap
    height .54rem
    display flex
    padding 0 .1rem
    align-items center
    button[isdisabled]
      background-color #dcdcdc
      color #999
    .login-btn
      border none
      height .3rem 
      line-height .3rem
      text-align center
      border-radius .03rem
      flex 1
      background #df2d2d
      color #fff
.subline
  height .14rem
  margin 0rem .1rem .14rem
  font-size .13rem
  color #FE8C00
  display flex
  justify-content space-between
footer 
  text-align center
  color #333
  span 
   color #df2d2d

</style>