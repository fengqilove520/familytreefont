import { asyncRoutes, constantRoutes } from '@/router'
import { getMenuListByUser } from '@/api/menu'
import de from 'element-ui/src/locale/lang/de'

const state = {
  routes: [],
  addRoutes: []
}
/**
 * 使 meta.role ，以确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(menus, route) {
  const menuCodes = menus.map(obj => { return obj.code })
  if (route.code) {
    return menuCodes.includes(route.code)
  } else {
    return true
  }
}

/**
 * 匹配后台菜单配置
 * @param tmp
 * @param menus
 */
function getMenuInfo(tmp, menus) {
  if (!tmp.code) {
    return tmp
  }
  menus.forEach(item => {
    if (tmp.code === item.code) {
      tmp.name = item.name
      tmp.meta.title = item.name
    }
  })
  return tmp
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach(route => {
    let tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      tmp = getMenuInfo(tmp, menus)
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })
  return res
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      getMenuListByUser({}).then(res => {
        const menus = res.data
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
