import GALogger from "../utils/GALogger";
import { useEffect } from "react";
import Url from "url-parse";

export default function AnalyticsPageLogger() {
  useEffect(() => {
    const url = new Url(window.location.href, true);
    const rawPath = url.pathname;
    const prependPath = url.query["logging_prepend_path"];

    const path =
      prependPath && prependPath.length > 0
        ? `/${prependPath}${rawPath}`
        : rawPath;

    GALogger.page(path, document.title);

    // TODO potentially add facebook pixel here, main FB pixel library doesn't like SSR
  }, []);
  return <></>;
}
