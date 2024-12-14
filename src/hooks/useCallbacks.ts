import { useEffect, useMemo } from "react";
import throttle from "lodash.throttle";
import { Bounds, Point, VisibleRect } from "../types";

type CallbackProps = {
  throttleMs: number;
  bounds: Bounds;
  position: Point;
  zoom: number;
  visibleRect: VisibleRect;
  onPositionChange?: (position: Point) => void;
  onZoomChange?: (zoom: number) => void;
  onBoundsChange?: (bounds: Bounds) => void;
  onVisibleRectChange?: (rect: VisibleRect) => void;
};

export default function useCallbacks({
  throttleMs,
  bounds,
  position,
  zoom,
  visibleRect,
  onPositionChange,
  onZoomChange,
  onBoundsChange,
  onVisibleRectChange,
}: CallbackProps) {
  const throttledCallbacks = useMemo(
    () => ({
      position: onPositionChange && throttle(onPositionChange, throttleMs),
      zoom: onZoomChange && throttle(onZoomChange, throttleMs),
      bounds: onBoundsChange && throttle(onBoundsChange, throttleMs),
      visibleRect:
        onVisibleRectChange && throttle(onVisibleRectChange, throttleMs),
    }),
    [
      onPositionChange,
      onZoomChange,
      onBoundsChange,
      onVisibleRectChange,
      throttleMs,
    ],
  );

  useEffect(() => {
    throttledCallbacks.position?.(position);
  }, [position, throttledCallbacks]);

  useEffect(() => {
    throttledCallbacks.zoom?.(zoom);
  }, [zoom, throttledCallbacks]);

  useEffect(() => {
    throttledCallbacks.bounds?.(bounds);
  }, [bounds, throttledCallbacks]);

  useEffect(() => {
    throttledCallbacks.visibleRect?.(visibleRect);
  }, [visibleRect, throttledCallbacks]);

  // Cleanup throttled functions
  useEffect(() => {
    return () => {
      Object.values(throttledCallbacks).forEach((callback) =>
        callback?.cancel(),
      );
    };
  }, [throttledCallbacks]);

  return {};
}
