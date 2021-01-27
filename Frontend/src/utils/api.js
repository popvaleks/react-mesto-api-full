import { config } from './constants'

export default class Api  {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getAllTasks() {
    return fetch(this._url, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkError)
  }

  getUsersCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkError)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkError)
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkError)
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkError)
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then(this._checkError)
  }

  editUserAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar.avatar
      })
    }).then(this._checkError)
  }

  addMyCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkError)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkError)
  }
}

 export const api = new Api(config);
