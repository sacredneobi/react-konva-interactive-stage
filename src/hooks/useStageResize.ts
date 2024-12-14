import { useCallback, useEffect, useRef } from "react";
import { Bounds, Dimensions, Point } from "../types";
import { calculateScale } from "./transform-utils";

interface Props {
  bounds: Bounds;
  container: Dimensions;
  scale: number;
  position: Point;
  setScale: (scale: number) => void;
  setPosition: (position: Point, scale?: number) => void;
}

export function useStageResize({
  bounds,
  container,
  scale,
  position,
  setScale,
  setPosition,
}: Props) {
  const previousContainer = useRef(container);

  const updateTransform = useCallback(() => {
    const prevCenter = {
      x: (-position.x + previousContainer.current.width / 2) / scale,
      y: (-position.y + previousContainer.current.height / 2) / scale,
    };

    const prevBaseScale = calculateScale(bounds, previousContainer.current);

    const newBaseScale = calculateScale(bounds, container);
    const relativeScale = scale / prevBaseScale.x;
    const newScale = newBaseScale.x * relativeScale;

    const newPosition = {
      x: -prevCenter.x * newScale + container.width / 2,
      y: -prevCenter.y * newScale + container.height / 2,
    };

    setScale(newScale);
    setPosition(newPosition, newScale);

    previousContainer.current = container;
  }, [container, bounds, scale, position, setScale, setPosition]);

  useEffect(() => {
    if (
      container.width !== previousContainer.current.width ||
      container.height !== previousContainer.current.height
    ) {
      updateTransform();
    }
  }, [container.width, container.height, updateTransform]);
}
