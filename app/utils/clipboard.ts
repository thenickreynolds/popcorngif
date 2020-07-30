export default class Clipboard {
  static write(text: string) {
    navigator.clipboard.writeText(text);
  }
}
