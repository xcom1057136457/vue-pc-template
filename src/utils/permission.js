import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router/index'
import nav from '../assets/json/nav.json'
import _ from 'lodash'
import {
  getToken
} from './auth'

const navList = nav;

NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  /* 路由白名单 */
  const whiteList = ['/dashboards', '/error', '/login']

  /* 获取token */
  const token = getToken()

  /* 获取nav文件信息 */
  let nav = navList.map(item => item.children);

  nav = _.flattenDeep(nav).map(item => item.path).concat(whiteList)
  
  /* 路由逻辑判断 */
  if (!token && to.path == '/login') {
    next()
  } else if (!token && to.path != '/login') {
    next('/login')
  } else {
    if (nav.includes(to.path)) {
      /*路由发生改变修改页面的title */
      if (to.meta.title) {
        document.title = to.meta.title + ' | 后台管理系统'
      }
      NProgress.start();
      next()
    } else if (to.path != '/error') {
      next({
        path: '/error'
      })
    } else {
      next()
    }
  }

});

router.afterEach(() => {
  NProgress.done()
})