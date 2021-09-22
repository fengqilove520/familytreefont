<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="dictQueryParam">
      <el-form-item label="字典类型:">
        <el-select  class="filter-item" filterable clearable v-model="dictQueryParam.type" placeholder="请选择" >
          <el-option v-for="item in typeOptions"  :key="item.type" :label="item.typeName" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button type="default" @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-table :data="pageInfo.list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="字典类型" width="120">
        <template slot-scope="scope">
          {{ scope.row.typeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="值" width="120">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="中文名" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="英文名" width="120">
        <template slot-scope="scope">
          {{ scope.row.nameEn }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="80">
        <template slot-scope="scope">
          {{ scope.row.orders }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="父类型" width="120">
        <template slot-scope="scope">
          {{ scope.row.parType }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="父类型值" width="100">
        <template slot-scope="scope">
          {{ scope.row.parCode }}
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
        <el-form-item label="值">
          <el-input v-model="dict.code" placeholder="值" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="dict.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="dict.nameEn" placeholder="英文名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="dict.type" placeholder="类型" />
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="dict.typeName" placeholder="类型名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="dict.orders" placeholder="排序" />
        </el-form-item>
        <el-form-item label="字典父类型">
          <el-select  class="filter-item" filterable clearable v-model="dict.parType" placeholder="请选择" @change="onSelectedType($event)">
            <el-option v-for="item in typeOptions"  :key="item.type" :label="item.typeName" :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父字典值">
          <el-select  class="filter-item" filterable clearable v-model="dict.parCode" placeholder="请选择">
            <el-option v-for="item in parCodeOptions"  :key="item.code" :label="item.name" :value="item.code">
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
import { getRoles, getTypeOptions, save, del, getCodeListByType } from '@/api/dict'

export default {
  data() {
    return {
      dict: {},
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
      }
    }
  },
  computed: {
  },
  created() {
    this.getDicts(this.pageInfo)
    this.getTypeOptions()
  },
  methods: {
    async getDicts(param) {
      const res = await getRoles(param)
      this.pageInfo = res.data
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      // 切换显示条数
      this.getDicts(Object.assign(this.pageInfo, this.dictQueryParam))
    },
    async getTypeOptions() {
      const res = await getTypeOptions()
      this.typeOptions = res.data
    },
    handleCurrentChange(pageNum) {
      // 切换页面
      this.pageInfo.pageNum = pageNum
      // 切换显示条数
      this.getDicts(this.pageInfo)
    },
    handleAdd() {
      this.getTypeOptions()
      this.dict = {}
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    handleEdit(data) {
      this.dict = data
      this.getTypeOptions()
      this.dialogVisible = true
      this.dialogType = 'edit'
    },
    commitEdit() {
      save(this.dict)
      this.dialogVisible = false
      this.getList()
    },
    handleDelete(data) {
      del(data.row.id)
    },
    getList() {
      this.getDicts(Object.assign(this.pageInfo, this.dictQueryParam))
    },
    resetData() {
      this.dictQueryParam = {}
      this.getList()
    },
    onSelectedType(data) {
      getCodeListByType({ 'type': data }).then(res => {
        this.parCodeOptions = res.data
      })
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
