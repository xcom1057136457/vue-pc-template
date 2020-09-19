import request from '@/utils/request'

export function getTask(params){
  return request({
    url: '/vue-element-admin/task/list',
    method: 'GET',
    params
  })
}

export function createTask(data) {
  return request({
    url: '/vue-element-admin/task/create',
    method: 'post',
    data
  })
}

export function fetchTask(id) {
  return request({
    url: '/vue-element-admin/task/detail',
    method: 'get',
    task: { id }
  })
}

export function startTask(data){
  return request({
    url: '/vue-element-admin/task/start',
    method: "POST",
    data
  })
}

export function stopTask(data){
  return request({
    url: '/vue-element-admin/task/stop',
    method: "POST",
    data
  })
}