import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/api/person/getPage',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/api/person/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/person/delete',
    method: 'post',
    data
  })
}

