import GALogger from "../utils/GALogger";
import { useEffect } from "react";

export default function AnalyticsPageLogger({ path }: { path: string }) {
  useEffect(() => {
    GALogger.page(path);
    // TODO potentially add facebook pixel here, main FB pixel library doesn't like SSR
  }, []);
  return <></>;
}
