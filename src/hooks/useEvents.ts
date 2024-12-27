import { InteractiveStageRef, InteractiveStageRenderProps } from "../types";
import React, { ReactElement, useEffect, useRef } from "react";
import Konva from "konva";

const PROPERTY_EVENTS = [
  "xChange",
  "yChange",
  "scaleXChange",
  "scaleYChange",
  "skewXChange",
  "skewYChange",
  "rotationChange",
  "offsetXChange",
  "offsetYChange",
  "transformsEnabledChange",
  "strokeChange",
  "strokeWidthChange",
  "fillChange",
  "radiusChange",
  "widthChange",
  "heightChange",
] as const;

export default function useEvents({
  stageRef,
  children,
  onNodesAdded,
  onNodesRemoved,
  onNodesModified,
}: {
  stageRef: InteractiveStageRef;
  children:
    | React.ReactNode
    | ((props: InteractiveStageRenderProps) => ReactElement);
  onNodesAdded?: (nodes: Konva.Node[]) => void;
  onNodesRemoved?: (nodes: Konva.Node[]) => void;
  onNodesModified?: (nodes: Konva.Node[]) => void;
}) {
  const shapesRef = useRef<Map<number, Konva.Node>>(new Map());
  const modifiedNodesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handlePropertyChange = (e: Konva.KonvaEventObject<Node>) => {
      const shape = e.currentTarget;
      if (!shape) return;
      modifiedNodesRef.current.add(shape._id);
      // Use requestAnimationFrame to batch multiple property changes
      requestAnimationFrame(handleShapeChanges);
    };

    const subscribeToPropertyChanges = (shape: Konva.Node) => {
      PROPERTY_EVENTS.forEach((eventName) => {
        shape.on(eventName, handlePropertyChange);
      });
    };

    const unsubscribeFromPropertyChanges = (shape: Konva.Node) => {
      PROPERTY_EVENTS.forEach((eventName) => {
        shape.off(eventName, handlePropertyChange);
      });
    };

    const stage = stageRef.current;
    if (!stage) return;

    const handleShapeChanges = () => {
      const currentShapes = stage.find("Shape");
      const currentShapeIds = new Set(currentShapes.map((shape) => shape._id));
      const previousShapeIds = new Set(shapesRef.current.keys());

      const addedNodes: Konva.Node[] = [];
      const removedNodes: Konva.Node[] = [];
      const modifiedNodes: Konva.Node[] = [];

      // Check for added shapes
      currentShapes.forEach((shape) => {
        if (!previousShapeIds.has(shape._id)) {
          shapesRef.current.set(shape._id, shape);
          addedNodes.push(shape);
          subscribeToPropertyChanges(shape);
        }
      });

      // Check for removed shapes
      Array.from(previousShapeIds).forEach((id) => {
        if (!currentShapeIds.has(id)) {
          const trackedNode = shapesRef.current.get(id);
          if (trackedNode) {
            removedNodes.push(trackedNode);
            shapesRef.current.delete(id);
            unsubscribeFromPropertyChanges(trackedNode);
          }
        }
      });

      // Check for modified shapes
      const modifiedShapeIds = Array.from(modifiedNodesRef.current);
      modifiedShapeIds.forEach((id) => {
        const shape = currentShapes.find((s) => s._id === id);
        if (shape) {
          modifiedNodes.push(shape);
        }
      });
      modifiedNodesRef.current.clear();

      // Trigger callbacks with batched changes
      if (addedNodes.length > 0) {
        onNodesAdded?.(addedNodes);
      }
      if (removedNodes.length > 0) {
        onNodesRemoved?.(removedNodes);
      }
      if (modifiedNodes.length > 0) {
        onNodesModified?.(modifiedNodes);
      }
    };

    setTimeout(handleShapeChanges, 0);

    // Initial state capture and event subscription
    const initialShapes = stage.find("Shape");
    initialShapes.forEach((shape) => {
      shapesRef.current.set(shape._id, shape);
      subscribeToPropertyChanges(shape);
    });

    return () => {
      // Cleanup: unsubscribe from all property change events
      Array.from(shapesRef.current.values()).forEach((trackedNode) => {
        unsubscribeFromPropertyChanges(trackedNode);
      });
    };
  }, [stageRef, children, onNodesAdded, onNodesRemoved, onNodesModified]);
}
