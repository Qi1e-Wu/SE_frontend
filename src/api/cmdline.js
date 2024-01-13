import request from '../util/request.js'
export function CLInterface(cmdline) {
  const data = {
    cmdline
  }
    return request({
      url: '/executeShell',
      method: 'post',
      data: data
    })
}

export function postCode(code) {
  const data=code
    return request({
      url: '/saveToRemote',
      method: 'post',
      data: data
    })
}

export function saveCode(code) {
  const data=code
    return request({
      url: '/saveToLocal',
      method: 'post',
      data: data
    })
}

