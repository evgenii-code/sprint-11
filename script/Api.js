'use strict';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.paths = options.paths;
  }

  fetchData(attribute, init = { headers: this.headers }) {
    const url = this.baseUrl + attribute;

    return fetch(url, init)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // Можно лучше
        // return Promise.reject(new Error(`Ошибка: ${res.status}`));     +
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  getInitialCards() {
    return this.fetchData(this.paths.cardsPath);
  }

  getUserInfo() {
    return this.fetchData(this.paths.userInfoPath);
  }

  setUserInfo({ name, about }) {
    const init = {
      headers: this.headers,
      'Content-Type': 'application/json',
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    };

    return this.fetchData(this.paths.userInfoPath, init);
  }

  setNewCard({ name, link }) {
    const init = {
      headers: this.headers,
      'Content-Type': 'application/json',
      method: 'POST',
      body: JSON.stringify({ name, link }),
    };

    return this.fetchData(this.paths.cardsPath, init);
  }

  toggleLike({ id, isLiked = true }) {
    const path = `${this.paths.likesPath}/${id}`;
    const init = {
      headers: this.headers,
      method: isLiked ? 'PUT' : 'DELETE',
    };

    return this.fetchData(path, init);
  }

  removeCard({ id }) {
    const path = `${this.paths.cardsPath}/${id}`;
    const init = {
      headers: this.headers,
      method: 'DELETE',
    };

    return this.fetchData(path, init);
  }
}