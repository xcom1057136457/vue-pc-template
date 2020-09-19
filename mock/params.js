const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cword(2,5)',
    code: '@word()',
    createTime: '@datetime()',
    description: '@cparagraph(1, 3)',
    createBy: '@cname()',
    'start|1-2': 2
  }))
}

module.exports = [{
    url: '/vue-element-admin/params/list',
    type: 'get',
    response: config => {
      const {
        page = 1, limit = 20, name, code, createBy, start,
      } = config.query

      let mockList = List.filter(item => {
        if (code && item.code != code) return false
        if (createBy && item.createBy != createBy) return false
        if (name && item.name != name) return false
        if (start && item.start != start) return false
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
    url: '/vue-element-admin/params/detail',
    type: 'get',
    response: config => {
      const {
        id
      } = config.query
      for (const params of List) {
        if (params.id === +id) {
          return {
            code: 200,
            data: params
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/params/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/params/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]