import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login/login',
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
