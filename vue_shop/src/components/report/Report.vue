<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入echarts
var echarts = require('echarts');
export default {
  data() {
    return {
      key: value
      }
  },
  created() {},
  // 此时页面上的元素，已经渲染完毕
  mounted() {},
  methods: {
    name() {
      
    }
  },
}
</script>

<style lang="scss" scoped>
</style>