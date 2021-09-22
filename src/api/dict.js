import request from '@/utils/request'

export function getRoles(data) {
  return request({
    url: '/api/dict/getPage',
    method: 'post',
    data
  })
}

export function getTypeOptions() {
  return request({
    url: '/api/dict/getTypeList',
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/api/dict/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/dict/delete',
    method: 'post',
    data: data
  })
}

export function getCodeListByType(data) {
  return request({
    url: '/api/dict/getCodeList',
    method: 'post',
    data: data
  })
}

