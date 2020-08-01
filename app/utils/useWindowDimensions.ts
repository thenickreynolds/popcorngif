import { useState, useEffect } from "react";

function isWindowDefined() {
  return typeof window !== "undefined";
}

function getWindowDimensions() {
  if (!isWindowDefined()) {
    // reasonable defaults for SSR
    return { width: 800, height: 600 };
  }

  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
