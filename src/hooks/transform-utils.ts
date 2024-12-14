import { Bounds, Dimensions, Point, Scale, VisibleRect } from "../types";

export function calculateScale(
  bounds: Dimensions,
  container: Dimensions,
): Scale {
  const scaleX = container.width / bounds.width;
  const scaleY = container.height / bounds.height;
  const scale = Math.min(scaleX, scaleY);

  return { x: scale === 0 ? 1 : scale, y: scale === 0 ? 1 : scale };
}

export function calculateInitialPosition(
  bounds: Bounds,
  container: Dimensions,
  scale: number,
): Point {
  // Center the content and account for content offset
  const x = (container.width - bounds.width * scale) / 2 - bounds.x * scale;
  const y = (container.height - bounds.height * scale) / 2 - bounds.y * scale;

  return { x, y };
}

export function getResetTransform(
  bounds: Bounds,
  container: Dimensions,
): { scale: number; position: Point } {
  const initialScale = calculateScale(bounds, container);
  const scale = initialScale.x;
  const position = calculateInitialPosition(bounds, container, scale);

  return { scale, position };
}

export function calculateVisibleRect(
  position: Point,
  scale: number,
  container: Dimensions,
): VisibleRect {
  const worldX = -position.x / scale;
  const worldY = -position.y / scale;
  const visibleWidth = container.width / scale;
  const visibleHeight = container.height / scale;

  return {
    left: worldX,
    top: worldY,
    right: worldX + visibleWidth,
    bottom: worldY + visibleHeight,
  };
}

export function clampPosition(
  position: Point,
  scale: number,
  container: Dimensions,
  bounds: Bounds,
): Point {
  const initialScale = calculateScale(bounds, container);
  const initialPos = calculateInitialPosition(
    bounds,
    container,
    initialScale.x,
  );
  const initialRect = calculateVisibleRect(
    initialPos,
    initialScale.x,
    container,
  );

  const maxPosX = -initialRect.left * scale;
  const minPosX = -initialRect.right * scale + container.width;
  const maxPosY = -initialRect.top * scale;
  const minPosY = -initialRect.bottom * scale + container.height;

  const clampedX = Math.max(minPosX, Math.min(maxPosX, position.x));
  const clampedY = Math.max(minPosY, Math.min(maxPosY, position.y));

  return {
    x: clampedX,
    y: clampedY,
  };
}
