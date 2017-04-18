<template>
  <div class="login">
    <div class="login__header">
      <h1 class="login__title">博客后台登录</h1>
    </div>
    <div class="login__item">
      <input type="text" placeholder="用户名" v-model="username">
    </div>
    <div class="login__item">
      <input type="password" placeholder="密码" v-model="password" @keyup.enter="login">
    </div>
    <div class="login__item">
      <button @click="login">登录</button>
    </div>
  </div>
</template>


<script>
import {Message} from 'element-ui'
import md5 from 'md5'
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
      let info = {
        "username": this.username,
        "password": md5(this.password).toUpperCase()
      }
      this.$store.dispatch('createToken', info).then((res) => {
        if(res.data.success) {
          this.$message({
            message: '登陆成功',
            type: 'success'
          });
          this.$router.push('/admin');
        }
      }).catch((err) => {
        this.$message.error(err.response.data.error)
      })
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
      border 1px solid $login-text 
      margin 0 auto
      padding-left 10px
    button
      display block
      width 300px
      height 50px
      margin 20px auto
      background-color $blue
      color white
</style>
