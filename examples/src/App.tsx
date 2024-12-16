import InteractiveStage, {
  InteractiveStageRenderProps,
  InteractiveStageType,
} from "react-konva-interactive-stage";
import { ReactNode, useRef, useState } from "react";
import { Header } from "./components/Header";
import { InstructionsPanel } from "./components/InstructionsPanel";
import { color, StageContent } from "./components/StageContent";
import { useDarkMode } from "./hooks/useDarkMode";
import StatePanel from "./components/StatePanel.tsx";
import { Circle } from "react-konva";
import { Bounds, VisibleRect } from "react-konva-interactive-stage/dist/types";

function App() {
  const stageRef = useRef<InteractiveStageType>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [bounds, setBounds] = useState<Bounds>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [visibleRect, setVisibleRect] = useState<VisibleRect>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const [isDark, setIsDark] = useDarkMode(true);

  const [extraShapes, setExtraShapes] = useState<ReactNode[]>([]);

  const onAddShape = () => {
    const shape = (
      <Circle
        x={2000 + 100 * extraShapes.length}
        y={Math.random() * 3000}
        radius={50 + Math.random() * 30}
        fill={color(Math.random() * 15, isDark)}
      />
    );
    setExtraShapes((prev) => [...prev, shape]);
  };

  const onRemoveShape = () => {
    setExtraShapes((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <div className="flex flex-col h-screen min-h-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header isDark={isDark} onToggleDarkMode={() => setIsDark(!isDark)} />
      <div className="flex-1 flex min-h-0 pt-8">
        <div className="flex-1 min-h-0 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="flex flex-col h-full min-h-0">
            <InstructionsPanel
              onAddShape={onAddShape}
              onRemoveShape={onRemoveShape}
            />
            <StatePanel
              position={position}
              zoom={zoom}
              bounds={bounds}
              visibleRect={visibleRect}
            />

            <div className="flex-1 bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg min-h-0">
              <div className="h-full p-4">
                <InteractiveStage
                  stageRef={stageRef}
                  onZoomChange={setZoom}
                  onPositionChange={setPosition}
                  onBoundsChange={setBounds}
                  onVisibleRectChange={setVisibleRect}
                  options={{
                    minZoom: 1,
                    maxZoom: 5,
                    panSpeed: 1.5,
                    debug: true,
                  }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-md p-4"
                >
                  {({
                    zoomToElement,
                    updateBounds,
                  }: InteractiveStageRenderProps) => (
                    <StageContent
                      isDark={isDark}
                      updateBounds={updateBounds}
                      extraShapes={extraShapes}
                      onShapeClick={(e) =>
                        zoomToElement(e.target, {
                          duration: 0.3,
                          paddingPercent: 0.2,
                        })
                      }
                    />
                  )}
                </InteractiveStage>
              </div>
            </div>
            <span className="text-gray-500 dark:text-gray-400 w-full flex justify-end py-2 opacity-50">
              Made with ❤️ by borck
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
