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

export function getParents(data) {
  return request({
    url: '/api/person/getList',
    method: 'post',
    data
  })
}

export function getTree(data) {
  return request({
    url: '/api/person/getTree',
    method: 'post',
    data
  })
}
