const API_KEY_TENOR = "Y7QV3LZRDJTL";

export default class SearchTenor {
  static search(term: string) {
    const url = `https://api.tenor.co/v1/search?tag=${escape(
      term
    )}&limit=50&key=${API_KEY_TENOR}`;
  }
}
