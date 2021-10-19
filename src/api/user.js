import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/api/login/igAuth/login',
    method: 'post',
    data
  })
}

// 退出
export function logout() {
  return request({
    url: '/api/login/logout',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/api/user/getAuth',
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
