export default class Download {
  static isSupported() {
    return false;
  }

  static download(url: string, filename: string) {
    // TODO figure out a way to support this, all X-site references are not working
  }
}
