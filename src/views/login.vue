<template>
    <div class='login-wrap' v-show='showLogin'>
       <h3>登录</h3>
       <p v-show='showTishi'>{{tishi}}</p>
       <input type="text" placeholder="请输入用户名" v-model='username'>
       <input type="text" placeholder="请输入密码" v-model='password'>
       <button v-on:click='login'>登录</button>
       <!-- 这里不应该用路由？？ -->
       <span >没有账号？马上注册</span>
       <!-- <span v-on:click='ToRegister' >没有账号？马上注册</span> -->
    </div>
</template>
<script>
import {setCookie,getCookie} from '@/assets/js/cookie.js'
export default {
    name:'Login',
    data(){
        return{
            showLogin:true,
            showRegister:false,
            showTishi:false,
            tishi:'',
            username:'',
            password:'',
            newUsername:'',
            newPassword:''
        }
    },
    mounted(){
        // 页面挂在获取cookie，如果存在username的cookie，则跳转到主页，不需要登录
        if(getCookie('username')){
            this.$router.push('./home')
        }
    },
    methods:{
        login(){
            if(this.username==""||this.paddword==""){
                alert("请输入用户名或密码")
            }else{
                let data={"username":this.username,"password":this.password}
                // 接口请求
                this.$http.post('/api/user/login',data).then((res)=>{
                    console.log(res)
                    // 接口传值是(-1，用户不存在)，(0,密码错误)，同时还会检测管理员账号的值
                    if(res.data==-1){
                        this.tishi="该用户不存在"
                        this.showTishi=true
                    }else if(res.data==0){
                        this.tishi="密码输入错误"
                        this.showTishi=true
                    }else if(res.data==="admin"){
                        // 路由跳转this.$router.push
                        this.$router.push('/main')
                    }else{
                        this.tishi="登录成功"
                        this.showTishi=true
                        setCookie('username',this.username,1000*60)
                        setTimeout(()=>{
                            this.$router.push('./home')
                            console.log(this)
                        },1000)
                    }
                })
            }
        }
    }
}
</script>
<style>
  .login-wrap{text-align:center;font-size:16px;}
    input{display:block; width:12em; height:2em; line-height:2em; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
    p{color:red;}
    button{display:block; width:12em; height:2em; line-height:2em; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
    span{cursor:pointer;}
    span:hover{color:#41b883;}
</style>

