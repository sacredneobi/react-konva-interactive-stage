import React from "react";
import { Dimensions, Point, VisibleRect, MinimapProps } from "../types";
import { useMinimapDrag } from "./useMinimapDrag";

/**
 * Minimap component that provides a small overview of the stage content
 * and allows for quick navigation by dragging.
 */
export default function Minimap({
  container,
  initialScale,
  bounds,
  visibleRect,
  minimapPct,
  ready,
  containerStyle,
  visibleRectStyle,
  className,
  style,
  initialPosition = { x: 0, y: 0 },
  stagePreview,
}: MinimapProps) {
  const { position, dragging, handleDragStart } = useMinimapDrag({
    container,
    minimapPct,
    initialPosition,
  });

  const minimapWidth = container.width * minimapPct;
  const minimapHeight = container.height * minimapPct;

  return (
    <div
      className={className}
      style={{
        opacity: ready ? 1 : 0,
        position: "absolute",
        top: position.y,
        left: position.x,
        cursor: dragging ? "grabbing" : "grab",
        width: minimapWidth,
        height: minimapHeight,
        ...style,
        overflow: "hidden",
      }}
      onMouseDown={handleDragStart}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: minimapWidth,
          height: minimapHeight,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 5,
          ...containerStyle,
        }}
      />
      {stagePreview && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: minimapWidth,
            height: minimapHeight,
            backgroundImage: `url(${stagePreview})`,
            opacity: 0.5,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          left:
            (visibleRect.left +
              (container.width / initialScale - bounds.width) / 2) *
            initialScale *
            minimapPct,
          top:
            (visibleRect.top +
              (container.height / initialScale - bounds.height) / 2) *
            initialScale *
            minimapPct,
          width:
            (visibleRect.right - visibleRect.left) * minimapPct * initialScale,
          height:
            (visibleRect.bottom - visibleRect.top) * minimapPct * initialScale,
          borderColor: "#ccc7",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "2px",
          ...visibleRectStyle,
        }}
      />
    </div>
  );
}
