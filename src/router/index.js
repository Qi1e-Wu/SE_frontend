import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout, // 修改为 Layout 组件
    children: [
      {
        path: '',
        component: () => import( '../views/HomeView.vue'),
        name: 'home'
      }
    ]
  },
  {
    path: '/',
    component: Layout, // 修改为 Layout 组件
    children: [
      {
        path: '',
        component: () => import( '../views/feedback.vue'),
        name: 'feedback'
      }
    ]
  },
  {
    path: '/about',
    component: Layout, // 修改为 Layout 组件
    children: [
      {
        path: '',
        component: () => import( '../views/AboutView.vue'),
        name: 'about'
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Reg.vue')
  },
  {
    path: '/rbac',
    component: Layout,
    children: [/* {
        path: 'user/list',
        component:() => import( '../views/User/List.vue')
      }, */
      {
        path: 'user/userinfo',
        component:() => import( '../views/User/userinfo.vue')
      },
      {
        path: 'user/ChangePassword',
        component:() => import( '../views/User/ChangePassword.vue')
      }
    ]
  },
  {
    path: '/experiment',
    component: Layout,
    children: [
      {
        path: 'createModule/createMain',
        name: 'createModule/createMain',
        component:() => import( '../views/createModule/createMain.vue')
      },
      {
        path: 'createModule/manage',
        name: 'manage',
        component:() => import( '../views/createModule/manage.vue')
      },
      {
        path: 'createModule/createExp',
        name: 'createExp',
        component:() => import( '../views/createModule/createExp.vue')
      },
    ]
  },
  {
    path: '/experiment',
    component: Layout,
    children: [
      {
        path: 'participateModule/participateMain',
        component:() => import( '../views/participateModule/participateMain.vue')
      },
    ]
  },
  {
    path: '/Exp',
    component: Layout,
    children:[{
      path: 'ExpModule/PythonMain',
      component:() => import( '../views/ExpModule/PythonMain.vue'),
    },
    {
      path: 'ExpModule/PythonCompiler',
      component:() => import('../views/ExpModule/PythonCompiler.vue'),
    },
    {
      path: 'ExpModule/PythonSelect',
      component:() => import('../views/ExpModule/PythonSelect.vue'),
    },
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
