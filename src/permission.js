import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  // 开始进度条
  NProgress.start()

  // set page title
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // 判断用户是否已经登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // 判断用户是否通过getInfo获得了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // 获取用户信息
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 注意:角色必须是一个对象数组!如 ['admin'] 或 ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 生成基于角色的可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // hack方法来确保addRoutes是完整的
          // set the replace: true, so the navigation will not leave a history record
          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // 移除令牌，到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    /* 没有令牌*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // 在免费登录白名单，直接去
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // 完成进度条
  NProgress.done()
})
