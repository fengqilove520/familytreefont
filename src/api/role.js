import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/api/role/getPage',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/api/role/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/role/delete',
    method: 'post',
    data
  })
}
