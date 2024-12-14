import { RefObject, useEffect, useRef } from "react";
import { useWheel } from "@use-gesture/react";
import type Konva from "konva";
import { InteractiveStageOptions, Point } from "../types";
import { Lethargy } from "lethargy-ts";

const lethargy = new Lethargy({
  sensitivity: 2,
  delay: 100,
});

interface Props {
  position: Point;
  setPosition: (position: Point) => void;
  handleZoom: (pointer: Point, direction: number, delta: number) => void;
  stageRef: RefObject<Konva.Stage>;
  loading: boolean;
  options: Required<InteractiveStageOptions>;
}

export function useWheelHandlers({
  position,
  setPosition,
  handleZoom,
  stageRef,
  loading,
  options,
}: Props) {
  const { zoomPanTransitionDelay, panSpeed } = options;
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const lastZoomTime = useRef(Date.now());

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Meta" || e.key === "Control") {
        lastZoomTime.current = Date.now();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  useWheel(
    ({ event, delta: [dx, dy], ctrlKey, metaKey }) => {
      if (loading) return;
      event.preventDefault();
      const stage = stageRef?.current;
      if (!stage) return;

      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const now = Date.now();
      const timeSinceZoom = now - lastZoomTime.current;

      if (ctrlKey || metaKey) {
        const direction = dy > 0 ? 1 : -1;
        handleZoom(pointer, direction, Math.abs(dy));
        lastZoomTime.current = now;
      } else {
        const isIntentional = lethargy.check(event);

        if (!isIntentional && timeSinceZoom <= zoomPanTransitionDelay) {
          return;
        }

        setPosition({
          x: position.x - dx * Math.sqrt(panSpeed),
          y: position.y - dy * Math.sqrt(panSpeed),
        });
      }
    },
    {
      target: wheelContainerRef,
      preventDefault: true,
      eventOptions: { passive: false },
      wheel: {
        initial: () => [position.x, position.y],
        rubberband: false,
        filterTaps: true,
        bounds: { velocity: [0, 1] },
      },
    },
  );

  return {
    wheelContainerRef,
  };
}
