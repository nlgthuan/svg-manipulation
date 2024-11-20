import { effect, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

function createAppState() {
  const svgContent = signal('');
  const selectedElement = signal(null);

  const fillColor = signal('');
  const strokeColor = signal('');
  const rotationAngle = signal(0);
  const widthScale = signal(1.0);
  const heightScale = signal(1.0);

  const updateSvgDrawing = () => {
    const svgDrawing = selectedElement.value;
    if (svgDrawing) {
      svgDrawing.each(function () {
        if (fillColor.value !== '') {
          this.attr('fill', fillColor.value);
        }
        if (strokeColor.value !== '') {
          this.attr('stroke', strokeColor.value);
        }

        const currentRotation = this.transform('rotate') || 0;
        this.transform({ rotate: currentRotation + rotationAngle.value });

        const currentScaleX = this.transform('scaleX') || 1.0;
        const currentScaleY = this.transform('scaleY') || 1.0;
        const newWidthScale = widthScale.value / currentScaleX;
        const newHeightScale = heightScale.value / currentScaleY;

        this.scale(newWidthScale, newHeightScale);
      });
    }
  };

  effect(updateSvgDrawing);

  return {
    svgContent,
    selectedElement,
    fillColor,
    strokeColor,
    rotationAngle,
    widthScale,
    heightScale,
    updateSvgDrawing,
  };
}

const AppContext = createContext();

export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={createAppState()}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
