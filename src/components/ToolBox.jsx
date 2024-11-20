import { batch } from '@preact/signals';
import { useState } from 'preact/hooks';

import { useAppContext } from '../context/AppContext';

function ToolBox() {
  const { fillColor, strokeColor, rotationAngle, widthScale, heightScale } =
    useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [proportional, setProportional] = useState(true);

  const handleScaleChange = (event, axis) => {
    const scale = parseFloat(event.target.value);
    let newWidthScale = widthScale.value;
    let newHeightScale = heightScale.value;

    if (proportional) {
      newWidthScale = scale;
      newHeightScale = scale;
    } else if (axis === 'width') {
      newWidthScale = scale;
    } else if (axis === 'height') {
      newHeightScale = scale;
    }

    batch(() => {
      widthScale.value = newWidthScale;
      heightScale.value = newHeightScale;
    });
  };

  const handleProportionalToggle = () => {
    setProportional(!proportional);
  };

  return (
    <div className="fixed bottom-0 right-0 shadow-lg rounded-t-lg bg-white border w-64 max-w-full">
      <div
        className="px-4 py-2 rounded-t-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium">Toolbox</h2>
      </div>
      {isOpen && (
        <div className="px-4 pb-3 mt-3">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fill Color:
            </label>
            <input
              type="color"
              value={fillColor.value || '#000000'}
              onChange={(e) => (fillColor.value = e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stroke Color:
            </label>
            <input
              type="color"
              value={strokeColor.value || '#000000'}
              onChange={(e) => (strokeColor.value = e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rotation (degrees):
            </label>
            <input
              type="number"
              value={rotationAngle.value}
              onChange={(e) =>
                (rotationAngle.value = parseInt(e.target.value) || 0)
              }
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
              value={widthScale.value}
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
              value={heightScale.value}
              onChange={(e) => handleScaleChange(e, 'height')}
              className="block w-full border border-gray-300 pl-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={proportional}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolBox;
