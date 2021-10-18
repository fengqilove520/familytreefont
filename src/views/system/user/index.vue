<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryParam">
      <el-form-item label="用户姓名">
        <el-input v-model="queryParam.fullName" placeholder="用户姓名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button type="default" @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-table :data="pageInfo.list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户名" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户类型" width="100">
        <template slot-scope="scope">
          {{ scope.row.typeValue }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="性别" width="60">
        <template slot-scope="scope">
          {{ scope.row.sexValue }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="身份证号" width="180">
        <template slot-scope="scope">
          {{ scope.row.card }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="手机号" width="120">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="电子邮件" width="200">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)" v-if="scope.row.type !== 0">删除</el-button>
          <el-button type="primary" size="small" @click="handleAuthorization(scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
      <el-form :model="user" label-width="120px" label-position="right">
        <el-form-item label="用户名">
          <el-input v-model="user.name" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.pwd" placeholder="密码" />
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="user.fullName" placeholder="用户姓名" />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="user.type" class="filter-item" filterable clearable placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item.code" :label="item.name" :value="+item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.sex" class="filter-item" filterable clearable placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.code" :label="item.name" :value="+item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="user.card" placeholder="身份证号" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="user.phone" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="user.image" placeholder="头像" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="commitEdit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="authDialogVisible">
      <el-tabs  @tab-click="handleAuthClick">
        <el-tab-pane label="授权菜单" name="menu">
          <el-tree
            :data="menus"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="授权角色" name="role">
          <el-tree
            :data="roles"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, save, del } from '@/api/user'
import { getCodeListByType } from '@/api/dict'

export default {
  data() {
    return {
      user: {},
      typeOptions: [],
      sexOptions: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10
      },
      queryParam: {},
      dialogVisible: false,
      authDialogVisible: false,
      dialogType: 'add',
      addRequiredRule: {
      },
      activeName: 'menu',
      roles: [],
      menus: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
  },
  created() {
    this.getUsers(this.pageInfo)
  },
  methods: {
    async getUsers(param) {
      const res = await getPage(param)
      this.pageInfo = res.data
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      // 切换显示条数
      this.getUsers(Object.assign(this.pageInfo, this.queryParam))
    },
    async getTypeOptions() {
      const res = await getCodeListByType({ type: 'user_type' })
      this.typeOptions = res.data
    },
    handleCurrentChange(pageNum) {
      // 切换页面
      this.pageInfo.pageNum = pageNum
      // 切换显示条数
      this.getUsers(this.pageInfo)
    },
    handleAdd() {
      this.getTypeOptions()
      this.getSexOptions()
      this.user = {}
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    handleEdit(data) {
      this.getTypeOptions()
      this.getSexOptions()
      this.user = data
      this.dialogVisible = true
      this.dialogType = 'edit'
    },
    handleAuthClick(data) {
      console.info(data)
      if (data.paneName === 'menu') {
        this.loadUserMenus()
      } else {
        this.loadUserRoles()
      }
    },
    commitEdit() {
      save(this.user)
      this.dialogVisible = false
      this.getList()
    },
    handleDelete(data) {
      del(data)
      this.getList()
    },
    handleAuthorization(data) {
      this.authDialogVisible = true
    },
    getList() {
      this.getUsers(Object.assign(this.pageInfo, this.queryParam))
    },
    resetData() {
      this.queryParam = {}
      this.getList()
    },
    async getSexOptions() {
      const res = await getCodeListByType({ type: 'sex' })
      this.sexOptions = res.data
    },
    loadUserMenus() {

    },
    loadUserRoles() {

    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
