<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-table :data="pageInfo.list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="字典类型" width="220">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="中文名" width="220">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="中文名" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="220">
        <template slot-scope="scope">
          {{ scope.row.order }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-sizes="[1, 5, 10]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
      <el-form :model="dict" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="dict.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="dict.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
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
import { getRoles } from '@/api/dict'

export default {
  data() {
    return {
      dict: {},
      routes: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10
      },
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoles({})
  },
  methods: {
    async getRoles() {
      const res = await getRoles(this.pageInfo)
      this.pageInfo = res.data
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      // 切换显示条数
      this.getRoles(this.pageInfo)
    },
    handleCurrentChange(pageNum) {
      // 切换页面
      this.pageInfo.pageNum = pageNum
      // 切换显示条数
      this.getRoles(this.pageInfo)
    },
    handleAdd() {
    },
    handleEdit(pageNum) {
    },
    commitEdit(pageNum) {
    },
    handleDelete(pageNum) {
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
