import { RefObject, useEffect, useRef, useState } from "react";
import { Dimensions } from "../types";

export function useResizeObserver(ref: RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const observerRef = useRef<ResizeObserver>();

  useEffect(() => {
    if (!ref.current) return;

    // Get initial dimensions
    const element = ref.current;
    const { width, height } = element.getBoundingClientRect();
    setDimensions({ width, height });

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) return;

      const entry = entries[0];
      const { width, height } = entry.contentRect;
      
      // Only update if dimensions actually changed
      setDimensions((prev) => {
        if (prev.width === width && prev.height === height) return prev;
        return { width, height };
      });
    });

    observerRef.current = resizeObserver;
    resizeObserver.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref]);

  return dimensions;
}
