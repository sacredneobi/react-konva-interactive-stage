import { useState, useEffect } from "react";
import { Dimensions, Point } from "../types";

interface UseMinimapDragProps {
  container: Dimensions;
  minimapPct: number;
  initialPosition?: Point;
}

interface UseMinimapDragReturn {
  position: Point;
  dragging: boolean;
  handleDragStart: () => void;
}

/**
 * Hook to handle dragging functionality for the minimap component
 */
export function useMinimapDrag({
  container,
  minimapPct,
  initialPosition = { x: 0, y: 0 },
}: UseMinimapDragProps): UseMinimapDragReturn {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState<Point>(initialPosition);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  // Keep position within bounds when container resizes
  useEffect(() => {
    const minimapWidth = container.width * minimapPct;
    const minimapHeight = container.height * minimapPct;

    setPosition((prev) => ({
      x: Math.min(Math.max(prev.x, 0), container.width - minimapWidth),
      y: Math.min(Math.max(prev.y, 0), container.height - minimapHeight),
    }));
  }, [container, minimapPct]);

  useEffect(() => {
    const handleDragMove = (e: MouseEvent) => {
      if (!dragging) return;

      const minimapWidth = container.width * minimapPct;
      const minimapHeight = container.height * minimapPct;

      const newX = Math.min(
        Math.max(position.x + e.movementX, 0),
        container.width - minimapWidth,
      );
      const newY = Math.min(
        Math.max(position.y + e.movementY, 0),
        container.height - minimapHeight,
      );

      setPosition({
        x: newX,
        y: newY,
      });
    };

    if (dragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [dragging, position, container, minimapPct]);

  return {
    position,
    dragging,
    handleDragStart,
  };
}
