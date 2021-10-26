import request from '@/utils/request'

// 获取全部省份
export function getProvinceList() {
  return request({
    url: '/api/area/getProvinceList',
    method: 'post'
  })
}

// 条件查询
export function getAreaList(data) {
  return request({
    url: '/api/area/getList',
    method: 'post',
    data
  })
}
