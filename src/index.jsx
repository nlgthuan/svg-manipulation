import { SVG } from '@svgdotjs/svg.js';
import { render } from 'preact';
import { useRef } from 'preact/hooks';

import SvgUploader from './components/SvgUploader';
import ToolBox from './components/ToolBox';
import { AppProvider, useAppContext } from './context/AppContext';

import './style.css';

function App() {
  const { svgContents, selectedElements } = useAppContext();
  const svgContainerRef = useRef();

  if (svgContainerRef.current) {
    const elements = [];
    for (const svgContent of svgContents.value) {
      const draw = SVG(svgContent).addTo(svgContainerRef.current);
      elements.push(draw);
    }

    selectedElements.value = elements;
  }

  return (
    <div className="min-h-svh flex flex-col">
      <h1 className="fixed text-lg text-center shadow-md rounded-md p-2 bg-white">
        SVG Manipulation Tool
      </h1>
      <div className="m-auto" ref={svgContainerRef}>
        {svgContents.value.length === 0 && <SvgUploader />}
      </div>
      <ToolBox />
    </div>
  );
}

render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('app'),
);
