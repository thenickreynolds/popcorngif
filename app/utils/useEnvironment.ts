import { useEffect, useState } from "react";
import Url from "url-parse";

export type Environment = "extension" | "normal" | "unknown";

export default function useEnvironment() {
  const [environment, setEnvironment] = useState<Environment>("unknown");
  useEffect(() => {
    const url = new Url(window.location.href, true);
    const isExtension = url.query["source"] === "extension";
    setEnvironment(isExtension ? "extension" : "normal");
  }, []);

  return environment;
}
