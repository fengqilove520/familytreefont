import request from '@/utils/request'

export function getPersonnelStatistics() {
  return request({
    url: '/api/dashboard/getPersonnelStatistics',
    method: 'post'
  })
}
