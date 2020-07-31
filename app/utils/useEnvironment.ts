import { useEffect, useState } from "react";
import Url from "url-parse";

type Environment = "extension" | "normal" | "unknown";

export default function useEnvironment() {
  const [environment, setEnvironment] = useState<Environment>("unknown");
  useEffect(() => {
    const url = new Url(window.location.href, true);
    const isExtension = url.query["logging_prepend_path"] === "extension";
    setEnvironment(isExtension ? "extension" : "normal");
  }, []);

  return environment;
}
