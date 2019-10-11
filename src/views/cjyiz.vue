<template>
  <div>
    尝试加载动态路由
    {{this.$route.params.id}}
    <router-link to='/home'>HOME</router-link>
  </div>
</template>