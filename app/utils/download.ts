declare const chrome: any;

export default class Download {
  static isSupported() {
    return typeof chrome !== 'undefined' && chrome?.downloads?.download !== undefined;
  }

  static download(url: string, filename: string) {
    chrome.downloads.download({ url, saveAs: filename });
  }
}
