import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/api/menu/getPage',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/api/menu/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/menu/delete',
    method: 'post',
    data
  })
}
