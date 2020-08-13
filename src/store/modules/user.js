import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Layout from '@/layout/index'
import {Encrypt} from '@/utils/AESCrypt'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        nickname:'',
        roles: [],
        permissions: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_NICKNEM:(state,nickname)=>{
            state.nickname=nickname;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(res => {
                    setToken(res)
                    commit('SET_TOKEN', res)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                  getInfo(state.token).then(res => {
                      commit('SET_NAME', res.userInfo.userName)
                      commit('SET_AVATAR', res.userInfo.avatar)
                      commit('SET_NICKNEM',res.userInfo.nickName)
                      commit('SET_PERMISSIONS', res.permissions)
                      const sideRouters = filterAsyncRouter(res.sideRouters)
                      const navRouters = filterAsyncRouter(res.navRouters)
                      commit('SET_SIDEROUTERS', sideRouters)
                      commit('SET_NAVROUTERS', navRouters)
                      resolve(sideRouters)
                  }).catch(error => {
                      reject(error)
                  })
              })
        },


        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    },


}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(route => {
        if (route.component) {
            // Layout组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout
            } else {
                route.component = loadView(route.component)
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
}
export const loadView = (view) => { // 路由懒加载
    return (resolve) => require([`@/views/${view}`], resolve)
}
export default user
