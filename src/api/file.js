import request from '../util/request.js'

export function getFileRec(filetype) {//传入想要获取的文件类型，比如python，otree等
    const data=filetype
    return request({
      url: '/api/getFileRec',
      method: 'post',
      data: data
    })
}

export function updateFileRec(fileinfo) {//传入想要更新的文件信息
    const data=fileinfo
    return request({
      url: '/api/updateFileRec',
      method: 'post',
      data: data
    })
}

export function removeFileRec(fileinfo) {//传入想要移除的文件信息
    const data=fileinfo
    return request({
      url: '/api/removeFileRec',
      method: 'delete',
      data: data
    })
}