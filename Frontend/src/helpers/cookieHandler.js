export function addCookie(name, value, seconds) {
    let date = new Date()
    date.setTime(date.getTime() + seconds)
    document.cookie = name + "=" + value + "path=/expires=" + date.toGMTString()
}

export function getCookie(name) {
    let v = document.cookie.match(`(^|) ?${name}=([^]*)(|$)`)
    return (v && v.length) ? v[2] : null
}

export function removeCookie(name) {
    let domain = 'popvaleks.students.nomoreparties.xyz',
        path = '/'; // root path
  
    document.cookie = [
      name, '=',
      '; expires=' + new Date(0).toUTCString(),
      '; path=' + path,
      '; domain=' + domain
    ].join('');
  }
