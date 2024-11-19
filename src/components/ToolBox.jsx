import { SVG } from '@svgdotjs/svg.js';
import { useEffect, useState } from 'preact/hooks';

import { normalizeColorValue } from '../utils';

function ToolBox({ selectedElement }) {
  const element = selectedElement.value ? SVG(selectedElement.value) : null;

  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');

  useEffect(() => {
    if (selectedElement.value) {
      const currentFill = selectedElement.value.getAttribute('fill');
      const currentStroke = selectedElement.value.getAttribute('stroke');

      if (currentFill) {
        setFillColor(normalizeColorValue(currentFill));
      }
      if (currentStroke) {
        setStrokeColor(normalizeColorValue(currentStroke));
      }
    }
  }, [selectedElement.value]);

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
      <div>
        <label className="block text-sm mb-1">Stroke Color:</label>
        <input
          type="color"
          value={strokeColor}
          onChange={handleStrokeColorChange}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default ToolBox;
