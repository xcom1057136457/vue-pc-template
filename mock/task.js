const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@name()',
    code: '@string("upper", 3, 5)',
    description: '@cparagraph(2)',
    "status|1-2": 2,
    createTime: '@datetime()',
    createBy: '@cname()',
    'durationTime|1-7': 7,
    path: '@url()' 
  }))
}

module.exports = [{
    url: '/vue-element-admin/task/list',
    type: 'get',
    response: config => {
      const {
        page = 1, limit = 20, name, code, createBy, status,
      } = config.query

      let mockList = List.filter(item => {
        if (code && item.code != code) return false
        if (createBy && item.createBy != createBy) return false
        if (name && item.name != name) return false
        if (status && item.status != status) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/task/detail',
    type: 'get',
    response: config => {
      const {
        id
      } = config.query
      for (const task of List) {
        if (task.id === +id) {
          return {
            code: 200,
            data: task
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/task/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/task/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/task/start',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/task/stop',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]