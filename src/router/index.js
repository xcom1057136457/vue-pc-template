import Vue from 'vue'
import VueRouter from 'vue-router'
import modules from './modules'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const dashboards = {
  path: '/dashboards',
  name: 'dashboards',
  component: () => import('../views/frame/dashbords.vue'),
  meta: {
    keepAlive: true,
    title: '控制台'
  }
}

const routes = [{
    redirect: '/login',
    path: '/'
  },
  {
    redirect: '/error',
    path: '*'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/frame/index.vue'),
    redirect: '/dashboards',
    children: [
      dashboards,
      ...modules
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/frame/404.vue'),
    meta: {
      title: "404"
    }
  }
]

const router = new VueRouter({
  routes
})

export default router