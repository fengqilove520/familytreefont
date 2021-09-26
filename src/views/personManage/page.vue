<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="dictQueryParam">
      <el-form-item label="名称:">
        <el-input v-model="person.name" placeholder="名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button type="default" @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-table :data="pageInfo.list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="姓名" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="120">
        <template slot-scope="scope">
          {{ scope.row.sexValue }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="户籍地址" width="120">
        <template slot-scope="scope">
          {{ scope.row.domicilePlace }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="居住地址" width="120">
        <template slot-scope="scope">
          {{ scope.row.residentialAddress }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出生时间" width="80">
        <template slot-scope="scope">
          {{ scope.row.birthTime }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="死亡时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.deathTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
      <el-form :model="dict" label-width="120px" label-position="right">
        <el-form-item label="姓名">
          <el-input v-model="person.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="person.sex" placeholder="性别" />
        </el-form-item>
        <el-form-item label="户籍地址">
          <el-input v-model="person.domicilePlace" placeholder="户籍地址" />
        </el-form-item>
        <el-form-item label="居住地址">
          <el-input v-model="person.residentialAddress" placeholder="居住地址" />
        </el-form-item>
        <el-form-item label="出生时间">
          <el-input v-model="person.birthTime" placeholder="出生时间" />
        </el-form-item>
        <el-form-item label="死亡时间">
          <el-input v-model="person.deathTime" placeholder="死亡时间" />
        </el-form-item>
        <el-form-item label="父亲">
          <el-select  class="filter-item" filterable clearable v-model="person.pid" placeholder="请选择" @change="onSelectedType($event)">
            <el-option v-for="item in typeOptions"  :key="item.type" :label="item.typeName" :value="item.type">
            </el-option>
          </el-select>
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
import { getPage, save, del } from '@/api/person'

export default {
  data() {
    return {
      person: {},
      typeOptions: [],
      parCodeOptions: [],
      routes: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10
      },
      dictQueryParam: {},
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
    this.getPage(this.pageInfo)
  },
  methods: {
    async getPage(param) {
      const res = await getPage(param)
      this.pageInfo = res.data
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      // 切换显示条数
      this.getPage(Object.assign(this.pageInfo, this.dictQueryParam))
    },
    handleCurrentChange(pageNum) {
      // 切换页面
      this.pageInfo.pageNum = pageNum
      // 切换显示条数
      this.getPage(this.pageInfo)
    },
    handleAdd() {
      this.person = {}
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    handleEdit(data) {
      this.person = data
      this.dialogVisible = true
      this.dialogType = 'edit'
    },
    commitEdit() {
      save(this.person)
      this.dialogVisible = false
      this.getList()
    },
    handleDelete(data) {
      del(data.row)
    },
    getList() {
      this.getPage(Object.assign(this.pageInfo, this.dictQueryParam))
    },
    resetData() {
      this.dictQueryParam = {}
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
