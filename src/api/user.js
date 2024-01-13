import request from '../util/request.js'

  export function ChangeInfo(info) {
    const data = info
    return request({
      url: '/admin-api/user/profile/change',
      method: 'post',
      data: data
    })
  }
  // 获取用户信息
export function getInfo() {
    return request({
      url: '/admin-api/user/profile/get',
      method: 'get'
    })
  }

