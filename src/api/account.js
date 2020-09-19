import request from '@/utils/request'

export function getAccount(params){
  return request({
    url: '/vue-element-admin/account/list',
    method: 'GET',
    params
  })
}

export function createAccount(data) {
  return request({
    url: '/vue-element-admin/account/create',
    method: 'post',
    data
  })
}

export function fetchAccount(id) {
  return request({
    url: '/vue-element-admin/account/detail',
    method: 'get',
    params: { id }
  })
}