<template>
  <div class='register-wrap'>
    <h3>注册</h3>
    <p v-show='showTishi'>{{tishi}}</p>
    <input type="text"
           placeholder="请输入用户名"
           v-model='username'>
    <input type="text"
           placeholder="请输入用户类型"
           v-model='usertype'>
    <input type="text"
           placeholder="请输入密码"
           v-model='password'>
    <input type="text"
           placeholder="确认密码"
           v-model='confirmPassword'>
    <button @click='register'>注册</button>
  </div>
</template>
<script>
import { setCookie } from '@/assets/js/cookie.js'
export default {
  name: 'Register',
  data () {
    return {
      showTishi: false,
      tishi: '',
      username: '',
      usertype: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register () {
      if (this.username === '' || this.password === '' || this.usertype === '') {
        alert('请输入用户信息')
      } else if (this.confirmPassword === '') {
        alert('请确认密码')
      } else if (this.password !== this.confirmPassword) {
        alert('两次输入密码不一致')
      } else {
        console.log('发送注册请求')
        let data = { "username": this.username, "password": this.password, 'usertype': this.usertype }
        // 请求接口
        this.$http.post('http://localhost:3000/user/register', data).then((res) => {
          if (res.data.message === '用户名已存在') {
            this.tishi = "用户名已存在"
            this.showTishi = true
          } else {
            console.log(this)
            this.showTishi = true
            this.tishi = '注册成功'
            setCookie('username', this.username, 1000 * 60)
            setTimeout(() => {
              this.$router.push('./home')
              console.log(this)
            }, 10000)
          }
        })
      }
    }
  }
}
</script>
<style>
.register-wrap {
  text-align: center;
  font-size: 16px;
}
input {
  display: block;
  width: 12em;
  height: 2em;
  line-height: 2em;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
p {
  color: red;
}
button {
  display: block;
  width: 12em;
  height: 2em;
  line-height: 2em;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>

