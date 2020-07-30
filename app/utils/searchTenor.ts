const API_KEY_TENOR = "Y7QV3LZRDJTL";

// TODO switch to using querystring
export default class SearchTenor {
  static searchUrl(term: string) {
    const url = `https://api.tenor.co/v1/search?tag=${escape(
      term
    )}&limit=50&key=${API_KEY_TENOR}`;
    return url;
  }

  static shareUrl(id: string) {
    return `https://api.tenor.co/v1/registershare?id=${id}&key=${API_KEY_TENOR}`;
  }
}
