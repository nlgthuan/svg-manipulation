import { useEffect, useState } from 'preact/hooks';

function ToolBox({ selectedElement }) {
  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');

  useEffect(() => {
    if (selectedElement.value) {
      const currentFill =
        selectedElement.value.getAttribute('fill') || '#000000';
      const currentStroke =
        selectedElement.value.getAttribute('stroke') || '#000000';
      setFillColor(currentFill);
      setStrokeColor(currentStroke);
    }
  }, [selectedElement.value]);

  const handleFillColorChange = (event) => {
    const color = event.target.value;
    setFillColor(color);
    if (selectedElement.value) {
      selectedElement.value.setAttribute('fill', color);
    }
  };

  const handleStrokeColorChange = (event) => {
    const color = event.target.value;
    setStrokeColor(color);
    if (selectedElement.value) {
      selectedElement.value.setAttribute('stroke', color);
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
