
const AccessTokenKey = 'ACCESS_TOKEN'

// ========== Token 相关 ==========

export function getAccessToken() {
  return localStorage.getItem(AccessTokenKey)
}


export function setToken(token) {
  localStorage.setItem(AccessTokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(AccessTokenKey)
}

// ========== 路径 相关 ==========

export function getPyPath() {
  return localStorage.getItem(PyPath)
}

export function getExPath() {
  return localStorage.getItem(ExPath)
}