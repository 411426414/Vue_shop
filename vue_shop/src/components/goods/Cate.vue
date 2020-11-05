<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!--
        表格区域：
          data 表格各行的数据
          columns 表格各列的配置
          border 是否显示纵向边框
          show-index 是否显示数据索引
          index-text 数据索引名称
          expand-type 是否为展开行类型表格（为 True 时，需要添加名称为 '$expand' 的作用域插槽, 它可以获取到 row, rowIndex)
          selection-type 是否为多选类型表格
          show-row-hover 鼠标悬停时，是否高亮当前行
      -->
      <tree-table
        :data="cateList"
        :columns="columns"
        border
        show-index
        index-text="#"
        :expand-type="false"
        :selection-type="false"
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
      </tree-table>
      <!-- 分页区域 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类数据列表，默认为空
      cateList: [],
      // 总数据条数
      total: 0,
      // 为table至指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 表示当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用的名称,使用template指定一个作用域插槽
          template: 'isOk'
        }
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('/categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类数据列表失败！')
      }
      this.$message.success('获取商品分类数据列表成功！')
      // 把数据列表赋值给catelist
      this.cateList = res.data.result
      // 为总数据条数赋值
      this.total = res.data.total
    }
  }
}
</script>

<style lang="stylus" scoped></style>
