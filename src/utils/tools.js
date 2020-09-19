import moment from 'moment'

export function setLocalStorage(val, name) {
  let type = typeof (val);
  let date = moment(new Date()).format()
  let obj = {
    type,
    date,
    content: val
  }
  localStorage.setItem(name, JSON.stringify(obj))
}

export function getLocalStorage(name) {
  let content = JSON.parse(localStorage.getItem(name))
  if (content) {
    return content.content
  } else {
    return null
  }
}

export function removeLocalStorage(name) {
  localStorage.removeItem(name)
}

export function setSessionStorage(val, name) {
  let type = typeof (val);
  let date = moment(new Date()).format()
  let obj = {
    type,
    date,
    content: val
  }
  sessionStorage.setItem(name, JSON.stringify(obj))
}

export function getSessionStorage(name) {
  let content = JSON.parse(sessionStorage.getItem(name))
  if (content) {
    return content.content
  } else {
    return null
  }
}

export function removeSessionStorage(name) {
  sessionStorage.removeItem(name)
}