export default function OptionsPanel({
  debug,
  toggleDebug,
  clampPosition,
  toggleClampPosition,
  maxZoom,
  setMaxZoom,
  panSpeed,
  setPanSpeed,
  zoomSpeed,
  setZoomSpeed,
}: {
  debug: boolean;
  toggleDebug: (debug: boolean) => void;
  clampPosition: boolean;
  toggleClampPosition: (clampPosition: boolean) => void;
  maxZoom: number;
  setMaxZoom: (maxZoom: number) => void;
  panSpeed: number;
  setPanSpeed: (panSpeed: number) => void;
  zoomSpeed: number;
  setZoomSpeed: (zoomSpeed: number) => void;
}) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg px-6 py-2 h-full w-full">
      <h2 className="text-base font-medium text-gray-900 dark:text-white mb-3">
        Options
      </h2>
      <div className="grid lg:grid-cols-2 gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="debug"
            className="w-4 h-4 text-primary-bright cursor-pointer"
            checked={debug}
            onChange={() => {
              toggleDebug(!debug);
            }}
          />
          <label
            htmlFor="show-bounds"
            className="text-sm font-medium cursor-pointer text-neutral-700 dark:text-neutral-200"
          >
            Show Debug Bounds
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="clamp"
            className="w-4 h-4 text-primary-bright cursor-pointer"
            checked={clampPosition}
            onChange={() => {
              toggleClampPosition(!clampPosition);
            }}
          />
          <label
            htmlFor="clamp"
            className="text-sm font-medium cursor-pointer text-neutral-700 dark:text-neutral-200"
          >
            Clamp Position
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="range"
            className="lg:w-32 sm:w-24 w-14"
            min={1}
            max={50}
            value={maxZoom}
            onChange={(e) => {
              setMaxZoom(Number(e.target.value));
            }}
          />
          <label
            htmlFor="max-zoom"
            className="text-sm font-medium cursor-pointer text-neutral-700 dark:text-neutral-200"
          >
            Max Zoom ({maxZoom})
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="lg:w-32 sm:w-24 w-14"
            type="range"
            min={0.1}
            max={10}
            value={panSpeed}
            onChange={(e) => {
              setPanSpeed(Number(e.target.value));
            }}
          />
          <label
            htmlFor="pan-speed"
            className="text-sm font-medium cursor-pointer text-neutral-700 dark:text-neutral-200"
          >
            Pan Speed ({panSpeed})
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="range"
            className="lg:w-32 sm:w-24 w-14"
            min={1}
            max={10}
            value={zoomSpeed}
            onChange={(e) => {
              setZoomSpeed(Number(e.target.value));
            }}
          />
          <label
            htmlFor="zoom-speed"
            className="text-sm font-medium cursor-pointer text-neutral-700 dark:text-neutral-200"
          >
            Zoom Speed ({zoomSpeed})
          </label>
        </div>
      </div>
    </div>
  );
}
