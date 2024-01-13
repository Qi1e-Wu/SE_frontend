import request from '../util/request.js'
  export function addFeedback(info) {
    return request({
      url: `/feedback/add?message=${info}`,
      method: 'post',
      data: info
    })
}