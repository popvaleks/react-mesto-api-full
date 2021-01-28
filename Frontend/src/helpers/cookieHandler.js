export function addCookie(name, value, seconds) {
  const date = new Date()
  date.setTime(date.getTime() + seconds)
  document.cookie = `${name}=${value}path=/expires=${date.toGMTString()}`
}

export function getCookie(name) {
  const v = document.cookie.match(`(^|) ?${name}=([^]*)(|$)`)
  return (v && v.length) ? v[2] : null
}

export function removeCookie(name) {
  const domain = 'popvaleks.students.nomoreparties.xyz'
  const path = '/' // root path

  document.cookie = [
    name, '=',
    `; expires=${new Date(0).toUTCString()}`,
    `; path=${path}`,
    `; domain=${domain}`,
  ].join('')
}
