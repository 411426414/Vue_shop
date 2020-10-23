<template>
  <el-container class="home-container">
      <el-button type="info" @click='logout'>退出</el-button>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()// 清空token
      this.$router.push('/login') // 跳转到登录页面
    }
  }
}
</script>

<style lang="less">
</style>
