import { useEffect } from "react";
import { useState } from "react";

export default function useThrottle<T>(value: T, timeoutMs: number) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeoutMs);

    return () => clearTimeout(handler);
  }, [value, timeoutMs]);

  return state;
}
