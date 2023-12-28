declare const chrome: any;

export default class Download {
  static isSupported() {
    return chrome && chrome.downloads && chrome.downloads.download;
  }

  static download(url: string, filename: string) {
    chrome.downloads.download({ url, saveAs: filename });
  }
}
