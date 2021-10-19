<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryParam">
      <el-form-item label="名称">
        <el-input v-model="queryParam.name" placeholder="名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button type="default" @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-table :data="pageInfo.list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="编码" width="120">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="120">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="类型" width="60">
        <template slot-scope="scope">
          {{ scope.row.typeValue }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="连接" width="200">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="父菜单" width="100">
        <template slot-scope="scope">
          {{ scope.row.pid }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="地址" width="100">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="排序" width="100">
        <template slot-scope="scope">
          {{ scope.row.order }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="图标" width="80">
        <template slot-scope="scope">
          {{ scope.row.icon }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)" >删除</el-button>
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
      <el-form :model="menu" label-width="120px" label-position="right">
        <el-form-item label="名称">
          <el-input v-model="menu.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="menu.code" placeholder="编码" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="menu.desc" placeholder="描述" />
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="menu.type" class="filter-item" filterable clearable placeholder="请选择">
              <el-option v-for="item in typeOptions" :key="item.code" :label="item.name" :value="+item.code" />
            </el-select>
        </el-form-item>
        <el-form-item label="连接">
          <el-input v-model="menu.url" placeholder="连接" />
        </el-form-item>
        <el-form-item label="父菜单">
          <el-select v-model="menu.pid" class="filter-item" filterable clearable placeholder="请选择">
            <el-option v-for="item in parentOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="menu.path" placeholder="路径" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menu.order" placeholder="排序" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menu.icon" placeholder="图标" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="commitEdit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, save, del, getList } from '@/api/menu'
import { getCodeListByType } from '@/api/dict'

export default {
  data() {
    return {
      menu: {},
      typeOptions: [],
      parentOptions: [],
      routes: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10
      },
      queryParam: {},
      dialogVisible: false,
      dialogType: 'add',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      addRequiredRule: {
      }
    }
  },
  computed: {
  },
  created() {
    this.getMenus(this.pageInfo)
  },
  methods: {
    async getMenus(param) {
      const res = await getPage(param)
      this.pageInfo = res.data
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      // 切换显示条数
      this.getMenus(Object.assign(this.pageInfo, this.queryParam))
    },
    async getTypeOptions() {
      const res = await getCodeListByType({ type: 'menu_type' })
      this.typeOptions = res.data
    },
    async getParentOptions() {
      const res = await getList({})
      this.parentOptions = res.data
    },
    handleCurrentChange(pageNum) {
      // 切换页面
      this.pageInfo.pageNum = pageNum
      // 切换显示条数
      this.getMenus(this.pageInfo)
    },
    handleAdd() {
      this.menu = {}
      this.parentOptions = this.getParentOptions()
      this.typeOptions = this.getTypeOptions()
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    handleEdit(data) {
      this.menu = data
      this.parentOptions = this.getParentOptions()
      this.typeOptions = this.getTypeOptions()
      this.dialogVisible = true
      this.dialogType = 'edit'
    },
    commitEdit() {
      save(this.menu)
      this.dialogVisible = false
      this.getList()
    },
    handleDelete(data) {
      del(data.row)
      this.getList()
    },
    getList() {
      this.getMenus(Object.assign(this.pageInfo, this.queryParam))
    },
    resetData() {
      this.queryParam = {}
      this.getList()
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
