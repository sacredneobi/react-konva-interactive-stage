import type Konva from "konva";
import React, { ReactElement, RefObject } from "react";

export interface Dimensions {
  width: number;
  height: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface VisibleRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Scale {
  x: number;
  y: number;
}

export interface ZoomOptions {
  duration?: number;
  paddingPercent?: number;
}

export interface MinimapOptions {
  /** Whether to show the minimap. Default: true */
  show?: boolean;
  /** The percentage of the container size that the minimap should occupy (between 0 and 1). Default: 0.2 */
  size?: number;
  /** Background color of the minimap. Default: "rgba(0, 0, 0, 0.5)" */
  backgroundColor?: string;
  /** Border radius of the minimap in pixels. Default: 5 */
  borderRadius?: number;
  /** Style object for the minimap container */
  containerStyle?: React.CSSProperties;
  /** Style object for the visible rect indicator */
  visibleRectStyle?: React.CSSProperties;
  /** Initial position of the minimap. Default: { x: 0, y: 0 } */
  position?: Point;
}

export interface InteractiveStageRenderProps {
  zoomToElement: (target: Konva.Node, options?: ZoomOptions) => void;
  resetZoom: () => void;
  scale: number;
  container: Dimensions;
  bounds: Bounds;
  updateBounds: () => void;
  position: Point;
  visibleRect: VisibleRect;
  loading: boolean;
  options: Required<InteractiveStageOptions>;
}

export type InteractiveStageType = Konva.Stage & {
  bounds: Dimensions;
};

export type InteractiveStageRef = RefObject<InteractiveStageType>;

export interface InteractiveStageOptions {
  /** Delay in milliseconds before showing loading state. Default: 500 */
  loadingDelay?: number;
  /** Maximum zoom level. Will be clamped to a maximum of 10 (1000% scale). Default: 3 */
  maxZoom?: number;
  /** Speed of zooming. Default: 5 */
  zoomSpeed?: number;
  /** Speed of panning. Default: 0.3 */
  zoomAnimationDuration?: number;
  /** Speed of panning. Default: 1 */
  panSpeed?: number;
  /** Whether to clamp the position to the bounds. Default: true */
  clampPosition?: boolean;

  /** Minimap configuration options */
  minimap?: MinimapOptions;

  /** Delay in milliseconds when transitioning between zoom and pan with mouse wheel. Default: 200 */
  zoomPanTransitionDelay?: number;
  /** Throttle callbacks in milliseconds. Default: 25 */
  callbacksThrottleMs?: number;
  /** Whether to show debug borders. Default: false */
  debug?: boolean;
}

export interface InteractiveStageProps
  extends Omit<Konva.StageConfig, keyof InteractiveStageRenderProps> {
  className?: string;
  style?: React.CSSProperties;

  stageRef: InteractiveStageRef;
  options?: InteractiveStageOptions;

  // optional dimensions in canvas units.
  // If not provided, the stage will automatically resize to fit its children.
  width?: number;
  height?: number;

  /** Callbacks **/
  onPositionChange?: (position: Point) => void;
  onZoomChange?: (zoom: number) => void;
  onBoundsChange?: (bounds: Bounds) => void;
  onVisibleRectChange?: (rect: VisibleRect) => void;

  children:
    | React.ReactNode
    | ((props: InteractiveStageRenderProps) => ReactElement);
}

export interface MinimapProps {
  container: Dimensions;
  initialScale: number;
  bounds: Dimensions;
  visibleRect: VisibleRect;
  minimapPct: number;
  ready: boolean;
  /** Style object for the minimap container */
  containerStyle?: React.CSSProperties;
  /** Style object for the visible rect indicator */
  visibleRectStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  initialPosition?: Point;
  /** Base64 data URL of the stage preview image */
  stagePreview?: string | null;
}
