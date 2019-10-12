<template>
  <div class="home">
    <h3>欢迎 {{user}} {{role}}</h3>
    <a href="#"
       @click="quit">注销登录</a>
    <br />
    <router-link to='/cjyiz1'>cjyiz1</router-link>|
    <router-link to='/cjyiz2'>cjyiz2</router-link>|
    <router-link to='/cjyiz3'>cjyiz3</router-link>|
  </div>
</template>

<script>
// @ is an alias to /src
// import { getCookie, delCookie } from "@/assets/js/cookie.js";

export default {
  name: "home",
  data () {
    return {
      user: '',
      role: ''

    };
  },
  mounted () {
    // 页面挂载获取保存的cookie值，渲染到页面上
    // let uname = getCookie("username")
    // this.name = uname
    // // 如果cookie不存在，则跳转到登录页
    // console.log(uname)
    // if (uname == "") {
    //   this.$router.push("/login");
    // }
    this.user = this.$store.getters.userInfo.name
    this.role = this.$store.getters.userInfo.role
    console.log(this.user)
  },
  methods: {
    quit () {
      // 删除cookie
      // delCookie("username");
      this.$store.dispatch('logout').then(() => { this.$router.push("./login") })
    }
  }
};
</script>
<style >
</style>
