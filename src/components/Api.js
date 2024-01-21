export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = {
      authorization: options.token,
      "Content-Type": "application/json",
    };
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
