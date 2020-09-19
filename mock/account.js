const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    username: '@cname()',
    englishName: '@name()',
    "age|1-50": 50,
    jobTime: '@datetime("yyyy-mm-dd A HH:mm:ss")',
    address: '@county(true)',
    "permission|1": [
      "admin",
      "editor",
    ],
    "onSite|1-2": 2,
    ip: '@ip()',
    email: '@email()',
    isCold: '@boolean()'
  }))
}

module.exports = [{
    url: '/vue-element-admin/account/list',
    type: 'get',
    response: config => {
      const {
        page = 1, limit = 20, name, onSite, permission
      } = config.query

      let mockList = List.filter(item => {
        if (permission && item.permission != permission) return false
        if (onSite && item.onSite != onSite) return false
        if (name && item.name != name) return false
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
    url: '/vue-element-admin/account/detail',
    type: 'get',
    response: config => {
      const {
        id
      } = config.query
      for (const account of List) {
        if (account.id === +id) {
          return {
            code: 200,
            data: account
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/account/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/account/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]