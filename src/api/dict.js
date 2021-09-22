import request from '@/utils/request'

export function getRoles(data) {
  debugger
  return request({
    url: '/api/dict/getPage',
    method: 'post',
    data
  })
}
