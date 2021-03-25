export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
  }
}
