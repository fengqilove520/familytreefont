<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryParam">
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
      <el-table-column align="center" label="出生时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.birthTime }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="死亡时间" width="160">
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
      :current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
      <el-form :model="person" label-width="120px" label-position="right">
        <el-form-item label="姓名-辈分">
          <el-col :span="3">
          <el-input v-model="person.familyName" placeholder="姓氏" />
          </el-col>
          <el-col :span="4">
          <el-input v-model="person.name" placeholder="名字" />
          </el-col>
          <el-col :span="3">
            <el-input v-model="person.generation" placeholder="辈分" />
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="person.sex" class="filter-item" filterable clearable placeholder="请选择" @change="getMateOptions">
            <el-option v-for="item in sexOptions" :key="item.code" :label="item.name" :value="+item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="在世时间">
          <el-date-picker
            v-model="person.birthTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择出生时间"
          />
          -
          <el-date-picker
            v-model="person.deathTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择去世时间"
          />
        </el-form-item>
        <el-form-item label="户籍地址">
          <el-col :span="6">
            <el-select v-model="person.domicileProvince" class="filter-item" filterable clearable placeholder="请选择省" @change="getDomicileCityOptions">
              <el-option v-for="item in provinceOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="person.domicileCity" class="filter-item" filterable clearable placeholder="请选择市" @change="getDomicileCountyOptions">
              <el-option v-for="item in domicileCityOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="person.domicileCounty" class="filter-item" filterable clearable placeholder="请选择区/县" @change="getDomicileTownOptions">
              <el-option v-for="item in domicileCountyOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="person.domicileTown" class="filter-item" filterable clearable placeholder="请选择镇/街道"  >
              <el-option v-for="item in domicileTownOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-input v-model="person.domicilePlace" placeholder="户籍地址" />
        </el-form-item>
        <el-form-item label="居住地址">
          <el-col :span="6">
            <el-select v-model="person.residentialProvince" class="filter-item" filterable clearable placeholder="请选择省" @change="getResidentialCityOptions">
              <el-option v-for="item in provinceOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="person.residentialCity" class="filter-item" filterable clearable placeholder="请选择市" @change="getResidentialCountyOptions">
              <el-option v-for="item in residentialCityOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="person.residentialCounty" class="filter-item" filterable clearable placeholder="请选择区/县" @change="getResidentialTownOptions">
              <el-option v-for="item in residentialCountyOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="person.residentialTown" class="filter-item" filterable clearable placeholder="请选择镇、街道">
              <el-option v-for="item in residentialTownOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-col>
          <el-input v-model="person.residentialAddress" placeholder="居住地址" />
        </el-form-item>
        <el-form-item label="配偶">
          <el-select v-model="person.mateId" class="filter-item" filterable clearable placeholder="请选择">
            <el-option v-for="item in mateOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="父亲">
          <el-select v-model="person.pid" class="filter-item" filterable clearable placeholder="请选择">
            <el-option v-for="item in parentOptions" :key="item.id" :label="item.name" :value="item.id" />
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
import { getPage, save, del, getList } from '@/api/person'
import { getCodeListByType } from '@/api/dict'
import { getProvinceList, getAreaList } from '@/api/area'

export default {
  data() {
    return {
      person: {},
      parentOptions: [],
      mateOptions: [],
      sexOptions: [],
      provinceOptions: [],
      domicileCityOptions: [],
      residentialCityOptions: [],
      domicileCountyOptions: [],
      residentialCountyOptions: [],
      domicileTownOptions: [],
      residentialTownOptions: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10
      },
      queryParam: {},
      dialogVisible: false,
      dialogType: 'add',
      checkStrictly: false
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
      this.getPage(Object.assign(this.pageInfo, this.queryParam))
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
      this.getParentOptions()
      this.getSexes()
      this.getProvinceList()
    },
    handleEdit(data) {
      this.person = data
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.getParentOptions()
      this.getMateOptions(this.person.sex)
      this.getSexes()
      this.getProvinceList()
      this.getDomicileCityOptions(data.domicileProvince)
      this.getDomicileCountyOptions(data.domicileCity)
      this.getDomicileTownOptions(data.domicileCounty)
      this.getResidentialCityOptions(data.residentialProvince)
      this.getResidentialCountyOptions(data.residentialCity)
      this.getResidentialTownOptions(data.residentialCounty)
    },
    commitEdit() {
      save(this.person)
      this.dialogVisible = false
      this.getList()
    },
    handleDelete(data) {
      del(data.row)
      this.getList()
    },
    getList() {
      this.getPage(Object.assign(this.pageInfo, this.queryParam))
    },
    resetData() {
      this.queryParam = {}
      this.getList()
    },
    async getParentOptions() {
      const data = { sex: 1 }
      const res = await getList(data)
      this.parentOptions = res.data
    },
    async getProvinceList() {
      const res = await getProvinceList()
      this.provinceOptions = res.data
    },
    async getMateOptions(param) {
      const data = { sex: this.person.sex === 0 ? 1 : 0 }
      const res = await getList(data)
      this.mateOptions = res.data
    },
    async getSexes() {
      const data = { type: 'sex' }
      const res = await getCodeListByType(data)
      this.sexOptions = res.data
    },
    async getDomicileCityOptions(param) {
      const res = await getAreaList({ pcode : param })
      this.domicileCityOptions = res.data
    },
    async getDomicileCountyOptions(param) {
      const res = await getAreaList({ pcode : param })
      this.domicileCountyOptions = res.data
    },
    async getDomicileTownOptions(param) {
      const res = await getAreaList({ pcode : param })
      this.domicileTownOptions = res.data
    },
    async getResidentialCityOptions(param) {
      const res = await getAreaList({ pcode : param })
      this.residentialCityOptions = res.data
    },
    async getResidentialCountyOptions(param) {
      const res = await getAreaList({ pcode : param })
      this.residentialCountyOptions = res.data
    },
    async getResidentialTownOptions(param) {
      const res = await getAreaList({ pcode : param })
      this.residentialTownOptions = res.data
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
