<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type='expand'>
          <template slot-scope="scope">
            <el-row :class="['vcenter', 'bdbottom', i1 === 0 ? 'bdtop' : '']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限-->
              <el-col :span='5'>
                <el-tag>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限-->
              <el-col :span='19'>
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row :class="['vcenter', i2 === 0 ? '' : 'bdtop']" v-for="(item2, i2) in item1.children" :key='item2.id'>
                  <el-col :span='6'>
                    <el-tag type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 通过for循环嵌套渲染三级权限 -->
                  <el-col :span='18'>
                    <el-tag type='warning' v-for="(item3) in item2.children" :key='item3.id' closable @close='removeRightById(scope.row, item3.id)'>{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width='300'>
          <template><!--  slot-scope="scope" -->
            <el-button type='primary' icon='el-icon-edit' size='mini'>编辑</el-button>
            <el-button type='danger' icon='el-icon-delect' size='mini'>删除</el-button>
            <el-button type='warning' icon='el-icon-setting' size='mini'>分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      rolesList: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
      console.log(this.rolesList)
    },
    // 根据ID删除对应的权限
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.$message.error('删除权限成功')
    }
  }
}
</script>

<style lang="less" scope>
.bdtop {
  border-top: 1px solid #EEE;
}
.bdbottom {
  border-bottom: 1px solid #EEE;
}
.el-tag {
  margin: 7px;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
