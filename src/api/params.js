import request from '@/utils/request'

export function getParams(params){
  return request({
    url: '/vue-element-admin/params/list',
    method: 'GET',
    params
  })
}

export function createParams(data) {
  return request({
    url: '/vue-element-admin/params/create',
    method: 'post',
    data
  })
}

export function fetchParams(id) {
  return request({
    url: '/vue-element-admin/params/detail',
    method: 'get',
    params: { id }
  })
}