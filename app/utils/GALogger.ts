type Category = "Search" | "GIF";

declare global {
  interface Window {
    dataLayer: any;
  }
}

export default class GALogger {
  private static dataLayer() {
    return window.dataLayer || [];
  }

  private static event(name: string, extra: any = {}) {
    this.dataLayer().push({
      event: name,
      ...extra,
    });
  }

  static search() {
    this.log("Search", "search");
  }

  static gifAction(action: string) {
    this.log("GIF", action);
  }

  static error(category: Category, action: string) {
    this.log(category, action, true);
  }

  private static log(
    category: Category,
    action: string,
    nonInteraction?: boolean
  ) {
    this.event(`${category}_${action}`);
  }
}
