import request from '../util/request.js'

// 用户登录
export function login(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/admin-api/auth/login',
    method: 'post',
    data: data
  })
}

export function register(info) {
  const data = info
  return request({
    url: '/admin-api/auth/register',
    method: 'post',
    data:data
  })
}
export function ChangePassword(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/admin-api/auth/ChangePassword',
    method: 'post',
    data: data
  })
}
