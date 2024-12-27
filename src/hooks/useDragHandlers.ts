import { useCallback, useRef } from "react";
import { Point } from "../types";
import type Konva from "konva";

interface Props {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  setPosition: (position: Point, scale?: number) => void;
  position: Point;
  scale: number;
}

export function useDragHandlers({
  isDragging,
  setIsDragging,
  setPosition,
  position,
  scale,
}: Props) {
  const lastMousePos = useRef<Point | null>(null);

  const handleDragStart = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.evt.preventDefault();
      const stage = e.target.getStage();
      if (!stage) return;

      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return;

      setIsDragging(true);
      lastMousePos.current = pointerPos;
    },
    [setIsDragging],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    lastMousePos.current = null;
  }, [setIsDragging]);

  const handleDragMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.evt.preventDefault();
      if (!isDragging || !lastMousePos.current) return;

      const stage = e.target.getStage();
      if (!stage) return;

      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return;

      const dx = pointerPos.x - lastMousePos.current.x;
      const dy = pointerPos.y - lastMousePos.current.y;

      const newPosition = {
        x: position.x + dx,
        y: position.y + dy,
      };

      lastMousePos.current = pointerPos;
      setPosition(newPosition, scale);
    },
    [isDragging, position, setPosition],
  );

  return {
    handleDragStart,
    handleDragEnd,
    handleDragMove,
  };
}
