export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.header = {
      authorization: options.token,
      "Content-Type": "application/json",
    };
  }
}
