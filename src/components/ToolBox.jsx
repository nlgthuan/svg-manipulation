import { useEffect, useState } from 'preact/hooks';

import { useAppContext } from '../context/AppContext';
import { normalizeColorValue } from '../utils';

function ToolBox() {
  const { selectedElement } = useAppContext();
  const svgDrawing = selectedElement.value;

  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    if (svgDrawing) {
      const currentFill = svgDrawing.attr('fill');
      const currentStroke = svgDrawing.attr('stroke');
      const currentRotation = svgDrawing.transform('rotate');

      if (currentFill) {
        setFillColor(normalizeColorValue(currentFill));
      }
      if (currentStroke) {
        setStrokeColor(normalizeColorValue(currentStroke));
      }
      setRotationAngle(+currentRotation || 0);
    }
  }, [svgDrawing]);

  const handleFillColorChange = (event) => {
    const color = event.target.value;
    setFillColor(color);
    if (svgDrawing) {
      svgDrawing.each(function () {
        this.attr('fill', color);
      });
    }
  };

  const handleStrokeColorChange = (event) => {
    const color = event.target.value;
    setStrokeColor(color);
    if (svgDrawing) {
      svgDrawing.each(function () {
        this.attr('stroke', color);
      });
    }
  };

  const handleRotationChange = (event) => {
    const angle = parseFloat(event.target.value) || 0;

    const oldAngle = rotationAngle;
    setRotationAngle(angle);

    if (svgDrawing) {
      svgDrawing.each(function () {
        this.rotate(angle - oldAngle);
      });
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
    </div>
  );
}

export default ToolBox;
