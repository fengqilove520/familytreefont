import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login/igAuth/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/api/user/getDetail',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getPage(data) {
  return request({
    url: '/api/user/getPage',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/api/user/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/user/delete',
    method: 'post',
    data
  })
}
