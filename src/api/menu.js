import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/api/menu/getPage',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/api/menu/getList',
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

// 用户菜单
export function getMenuListByUser() {
  return request({
    url: '/api/menu/getMenuListByUser',
    method: 'post'
  })
}

