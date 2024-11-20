import { useEffect, useState } from 'preact/hooks';

import { useAppContext } from '../context/AppContext';
import { normalizeColorValue } from '../utils';

function ToolBox() {
  const { selectedElement } = useAppContext();
  const svgDrawing = selectedElement.value;

  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [widthScale, setWidthScale] = useState(1.0);
  const [heightScale, setHeightScale] = useState(1.0);
  const [proportional, setProportional] = useState(true);

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

  const handleScaleChange = (event, axis) => {
    const scale = parseFloat(event.target.value);
    let newWidthScale = widthScale;
    let newHeightScale = heightScale;

    if (proportional) {
      newWidthScale = scale;
      newHeightScale = scale;
    } else if (axis === 'width') {
      newWidthScale = scale;
    } else if (axis === 'height') {
      newHeightScale = scale;
    }

    setWidthScale(newWidthScale);
    setHeightScale(newHeightScale);

    if (svgDrawing) {
      svgDrawing.each(function () {
        this.scale(newWidthScale / widthScale, newHeightScale / heightScale);
      });
    }
  };

  const handleProportionalToggle = () => {
    setProportional(!proportional);
  };

  return (
    <div className="fixed bottom-0 right-0 px-4 py-3 shadow-lg rounded-t-lg bg-white border w-64 max-w-full">
      <h2 className="text-lg mb-3 font-medium">Toolbox</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fill Color:
        </label>
        <input
          type="color"
          value={fillColor}
          onChange={handleFillColorChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stroke Color:
        </label>
        <input
          type="color"
          value={strokeColor}
          onChange={handleStrokeColorChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rotation (degrees):
        </label>
        <input
          type="number"
          value={rotationAngle}
          onChange={handleRotationChange}
          className="block w-full border border-gray-300 pl-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Proportional Scaling:
          <input
            type="checkbox"
            checked={proportional}
            onChange={handleProportionalToggle}
            className="ml-2 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Width Scale:
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={widthScale}
          onChange={(e) => handleScaleChange(e, 'width')}
          className="block w-full border border-gray-300 pl-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Height Scale:
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={heightScale}
          onChange={(e) => handleScaleChange(e, 'height')}
          className="block w-full border border-gray-300 pl-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          disabled={proportional}
        />
      </div>
    </div>
  );
}

export default ToolBox;
