import { SVG } from '@svgdotjs/svg.js';
import { useEffect, useState } from 'preact/hooks';

import { useAppContext } from '../context/AppContext';
import { normalizeColorValue } from '../utils';

function ToolBox() {
  const { selectedElement } = useAppContext();
  const element = selectedElement.value ? SVG(selectedElement.value) : null;

  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);

  useEffect(() => {
    if (element) {
      const currentFill = element.attr('fill');
      const currentStroke = element.attr('stroke');
      const currentRotation = element.transform('rotate');
      const currentScaleX = element.transform('scaleX');
      const currentScaleY = element.transform('scaleY');

      if (currentFill) {
        setFillColor(normalizeColorValue(currentFill));
      }
      if (currentStroke) {
        setStrokeColor(normalizeColorValue(currentStroke));
      }
      setRotationAngle(+currentRotation || 0);
      setScaleX(currentScaleX || 1);
      setScaleY(currentScaleY || 1);
    }
  }, [element]);

  const handleFillColorChange = (event) => {
    const color = event.target.value;
    setFillColor(color);
    if (element) {
      element.attr('fill', color);
    }
  };

  const handleStrokeColorChange = (event) => {
    const color = event.target.value;
    setStrokeColor(color);
    if (element) {
      element.attr('stroke', color);
    }
  };

  const handleRotationChange = (event) => {
    const angle = parseFloat(event.target.value) || 0;
    setRotationAngle(angle);
    if (element) {
      element.rotate(-rotationAngle).rotate(angle);
    }
  };

  const handleScaleChange = (event, axis) => {
    const value = parseFloat(event.target.value) || 1;
    if (axis === 'x') {
      if (keepAspectRatio) {
        setScaleX(value);
        setScaleY(value);
        if (element) {
          element.scale(value, value);
        }
      } else {
        setScaleX(value);
        if (element) {
          element.scale(value, scaleY);
        }
      }
    } else {
      setScaleY(value);
      if (element) {
        element.scale(scaleX, value);
      }
    }
  };

  return (
    <div className="fixed bottom-0 right-0 px-2 py-1 shadow-lg rounded-t-md bg-white border w-64 max-w-full">
      <h2 className="text-lg mb-2">Toolbox</h2>
      <div className="mb-2">
        <label className="block text-sm mb-1">Fill Color:</label>
        <input
          type="color"
          value={fillColor}
          onChange={handleFillColorChange}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Stroke Color:</label>
        <input
          type="color"
          value={strokeColor}
          onChange={handleStrokeColorChange}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Rotation (degrees):</label>
        <input
          type="number"
          value={rotationAngle}
          onChange={handleRotationChange}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Scale X:</label>
        <input
          type="number"
          value={scaleX}
          step="0.1"
          onChange={(e) => handleScaleChange(e, 'x')}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Scale Y:</label>
        <input
          type="number"
          value={scaleY}
          step="0.1"
          onChange={(e) => handleScaleChange(e, 'y')}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">
          <input
            type="checkbox"
            checked={keepAspectRatio}
            onChange={(e) => setKeepAspectRatio(e.target.checked)}
          />{' '}
          Keep Aspect Ratio
        </label>
      </div>
    </div>
  );
}

export default ToolBox;
