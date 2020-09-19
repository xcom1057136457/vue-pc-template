const module = [
  {
    path: '/AccountManager',
    name: 'AccountManager',
    component: () => import('@/views/account/index'),
    meta: {
      keepAlive: true,
      title: '账号管理'
    }
  },
  {
    path: '/AccountDetail',
    name: 'AccountDetail',
    component: () => import('@/views/account/AccountDetail'),
    meta: {
      keepAlive: false,
      title: '账号详情'
    }
  },
  {
    path: '/ParamsManager',
    name: 'ParamsManager',
    component: () => import('@/views/params/index'),
    meta: {
      keepAlive: true,
      title: '参数管理'
    }
  },
  {
    path: '/TaskManager',
    name: 'TaskManager',
    component: () => import('@/views/task/index'),
    meta: {
      keepAlive: true,
      title: '任务管理'
    }
  }
]

export default module