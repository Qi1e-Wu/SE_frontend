import request from '../util/request.js'

export function getExpRec() {
    return request({
      url: '/experiment/getlist',
      method: 'get',
    })
}
//根据用户ID获得我参与的实验列表
export function getJoinedExpList() {
  return request({
    url: '/distribution/joinedByList',
    method: 'get',
  })
}
export function getParticipantByExpId(expId) {
  const data={
    expId: expId
  }
  return request({
    url: '/experiment/getParticipant',
    method: 'get',
    params:data
  })
}

export function updateExpRec(fileinfo) {
    const data=fileinfo
    return request({
      url: '/experiment/update',
      method: 'post',
      data: data
    })
}

export function removeExpRec(fileinfo) {
    const data=fileinfo
    return request({
      url: '/experiment/delete',
      method: 'delete',
      data: data
    })
}

export function getExpRecById(userid) {
  return request({
    url: '/experiment/delete',
    method: 'delete',
    params: userid
  })
}

//删除实验
export function deleteExperiment(expId) {
    return request({
        url: `/experiment/delete?expId=${expId}`,
        method: 'post'
    });
}

//查看被试名单
export function getParticipant(expId) {
    return request({
        url:`/experiment/getParticipant?expId=${expId}`,
        method: 'get'
    })
}

//删除被试者
export function deleteParticipant(expId, username) {
    return request({
        url:`/experiment/deleteParticipant?expId=${expId}&username=${username}`,
        method: 'post'
    })
}

//新增被试者
export function execAddParticipant(expId, userId) {
  const data ={
    expId,
    userId
  }
  return request({
      url:`/experiment/addParticipant?expId=${expId}&userId=${userId}`,
      method: 'post',
      data: data
  })
}

//执行一键分发
export function execQuickDistribution(expId, url) {
  const data ={
    expId,
    url
  }
  return request({
      url:`/distribution/experimentByUrl`,
      method: 'post',
      data: data
  })
}

//导入被试者文件
export function execImportFile(formData) {
  return request({
      url:`/experiment/uploadParticipant`,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  });
}
