# React Konva Interactive Stage

A React component for creating interactive and zoomable Konva stages with smooth pan and zoom capabilities.

Built on top of [Konva](https://konvajs.org/) and [React-Konva](https://github.com/konvajs/react-konva).

[Live demo here](https://react-konva-interactive-stage.up.railway.app/)

## Features

- 🖱️ Smooth pan and zoom interactions
- 🎯 Click-to-zoom on specific elements
- 🔄 Automatic bounds calculation
- 📱 Responsive container
- 🗺️ Customizable minimap navigation with live content preview
- 🎯 TypeScript support

## Installation

```bash
npm install react-konva-interactive-stage
# or
yarn add react-konva-interactive-stage
# or
pnpm add react-konva-interactive-stage
# or
bun add react-konva-interactive-stage
```

## Usage

```tsx
import InteractiveStage from 'react-konva-interactive-stage';
import { Circle } from 'react-konva';

function App() {
  return (
    <InteractiveStage
      options={{
        minZoom: 1,
        maxZoom: 5,
        panSpeed: 1.5,
      }}
    >
      {({ zoomToElement }) => (
        <Circle
          x={100}
          y={100}
          radius={50}
          fill="red"
          onClick={(e) => zoomToElement(e.target)}
        />
      )}
    </InteractiveStage>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `InteractiveStageOptions` | Configuration options for the stage |
| `width` | `number` | Optional width in canvas units |
| `height` | `number` | Optional height in canvas units |
| `className` | `string` | CSS class name for the container |
| `style` | `CSSProperties` | Inline styles for the container |
| `children` | `ReactNode \| ((props: InteractiveStageRenderProps) => ReactNode)` | Stage content |

If width and/or height are not provided, the stage will automatically resize to fit its children.

### Options

```typescript
interface InteractiveStageOptions {
  minZoom?: number;         // Minimum zoom level (default: 1)
  maxZoom?: number;         // Maximum zoom level (default: 100)
  zoomSpeed?: number;       // Zoom speed in [0.1, 10] (default: 5)
  panSpeed?: number;        // Pan speed in [1, 10] (default: 1)
  clampPosition?: boolean;  // Prevent panning outside bounds (default: true)
  debug?: boolean;          // Show debug overlay (default: false)
  minimap?: {
    show?: boolean;         // Show/hide the minimap (default: true)
    size?: number;          // Size relative to container in [0, 1] (default: 0.15)
    position?: Point;       // Initial position (default: { x: 0, y: 0 })
    containerStyle?: React.CSSProperties;  // Styles for minimap container
    visibleRectStyle?: React.CSSProperties;  // Styles for visible area indicator
  }
}
```

Example with custom minimap styling:

```tsx
<InteractiveStage
  options={{
    minimap: {
      size: 0.2,  // 20% of container size
      containerStyle: {
        backgroundColor: '#0007',
        borderRadius: 5,
      },
      visibleRectStyle: {
        backgroundColor: '#7772',
        borderRadius: 5,
      },
      position: { x: 20, y: 20 },  // 20px from top-left corner
    },
  }}
>
  {/* ... your stage content ... */}
</InteractiveStage>
```

The minimap automatically displays a live preview of your stage content, making it easier to navigate complex scenes. The preview is updated whenever the stage content changes and is automatically scaled to fit within the minimap container while maintaining aspect ratio.

### Render Props

```typescript
interface InteractiveStageRenderProps {
  zoomToElement: (element: Konva.Node, options?: ZoomOptions) => void;
  resetZoom: () => void; 
  updateBounds: () => void;
  loading: boolean;
  scale: number;
  position: Point;
  bounds: Bounds;
  visibleRect: VisibleRect;
  options: Required<InteractiveStageOptions>;
}
```

Those are available in the children prop:
```tsx
function App() {
  return (
    <InteractiveStage>
      {({ zoomToElement, resetZoom, scale, position, bounds }) => (
          ... your konva content here ...
      )}
    </InteractiveStage>
  );
}
```

## Controls

- **Pan**: Click and drag or use the mouse wheel
- **Zoom**: Use Cmd/Ctrl + mouse wheel
- **Reset Zoom**: Double-click

## Examples

Check out the [examples](./examples) directory for a full demo application showcasing all features.

To run the examples locally:

```bash
cd examples
pnpm install
pnpm dev
```

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Type check
pnpm typecheck
```



## License

MIT Pierre Borckmans
