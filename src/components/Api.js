export class Api {
  constructor(config) {
    this.url = config.url;
    this.authorization = config.headers.authorization;
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.authorization,
      },
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
      headers: {
        authorization: this.authorization,
      },
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

  setUser() {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // todo: проверить
        // name: userData.name,
        // about: userData.about,
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      }),
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
