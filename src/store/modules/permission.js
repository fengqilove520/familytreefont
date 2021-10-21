import { asyncRoutes, constantRoutes } from '@/router'
import { getMenuListByUser } from '@/api/menu'

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
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
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
