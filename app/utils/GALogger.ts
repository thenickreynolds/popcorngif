import ReactGA from "react-ga";

type Category = "Search" | "GIF";

export default class GALogger {
  private static initialized = false;

  static search() {
    this.log("Search", "search");
  }

  static gifAction(action: string) {
    this.log("GIF", action);
  }

  static error(category: Category, action: string) {
    this.log(category, action, true);
  }

  static page(path: string) {
    this.ensureInit();
    ReactGA.pageview(path);
  }

  static ensureInit() {
    if (!window) {
      console.error("Initializing GA on the server");
    }

    if (!this.initialized) {
      ReactGA.initialize("UA-15077025-2");
      this.initialized = true;
    }
  }

  private static log(
    category: Category,
    action: string,
    nonInteraction?: boolean
  ) {
    this.ensureInit();
    console.log(`GA: ${category} - ${action}`);
    ReactGA.event({ category, action, nonInteraction });
  }
}
