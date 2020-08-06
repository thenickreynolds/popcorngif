import GALogger from "../utils/GALogger";
import { useEffect } from "react";

export default function AnalyticsPageLogger() {
  useEffect(() => {
    const path = window.location.pathname + window.location.search;
    GALogger.page(path, document.title);

    // TODO potentially add facebook pixel here, main FB pixel library doesn't like SSR
  }, []);
  return <></>;
}
