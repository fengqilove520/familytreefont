import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
      component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        code: '001',
        component: () => import('@/views/dashboard/index'),
        name: '?????????',
        meta: { title: '?????????', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'system/index',
    code: '002',
    alwaysShow: true, // will always show the root menu
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        code: '002001',
        name: '????????????',
        meta: { title: '????????????', icon: 'list' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index'),
        code: '002002',
        name: '????????????',
        meta: { title: '????????????', icon: 'list' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        code: '002003',
        name: '????????????',
        meta: { title: '????????????', icon: 'list' }
      },
      {
        path: 'dict',
        component: () => import('@/views/system/dict/index'),
        code: '002004',
        name: '????????????',
        meta: { title: '????????????', icon: 'list' }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    code: '003',
    redirect: 'person/index',
    alwaysShow: true, // will always show the root menu
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'peoples' // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/person/page'),
        name: '????????????',
        meta: { title: '????????????', icon: 'list' },
        roles: ['admin']
      },
      {
        path: 'tree',
        component: () => import('@/views/person/tree'),
        name: '?????????',
        meta: { title: '?????????', icon: 'list' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
