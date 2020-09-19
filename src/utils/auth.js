import Cookies from 'js-cookie'

const TokenKey = '__Dioa__ADMIN__'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: 7
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

