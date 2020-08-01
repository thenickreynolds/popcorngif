import GALogger from "../utils/GALogger";
import { useEffect } from "react";

export default function AnalyticsPageLogger() {
  useEffect(() => {
    GALogger.page(window.location.href, document.title);

    // TODO potentially add facebook pixel here, main FB pixel library doesn't like SSR
  }, []);
  return <></>;
}
