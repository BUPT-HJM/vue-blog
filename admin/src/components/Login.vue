<template>
  <div class="login">
    <div class="login__header">
      <h1 class="login__title">博客后台登录</h1>
    </div>

    <div class="login__item">
      <input type="text" placeholder="用户名">
    </div>
    <div class="login__item">
      <input type="password" placeholder="密码">
    </div>
    <div class="login__item">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$router.push('/admin') // 编程式路由，通过push方法，改变路由。
    }
  }
}
</script>


<style lang="stylus">
@import '../assets/stylus/_settings.styl'
.login
  max-width 640px
  margin 150px auto 0 auto
  &__header
    margin 0 auto 50px auto
    text-align center
  &__item
    margin-bottom 10px
    padding 0 10px 0 10px
    input
      display block
      width 300px
      height 50px
      border 1px solid $light-text
      margin 0 auto
      padding-left 10px
    button
      display block
      width 300px
      height 50px
      margin 20px auto
      background-color $dark-blue
      color $white
</style>
