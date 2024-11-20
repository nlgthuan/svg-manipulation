import { SVG } from '@svgdotjs/svg.js';
import { render } from 'preact';
import { useRef } from 'preact/hooks';

import SvgUploader from './components/SvgUploader';
import ToolBox from './components/ToolBox';
import { AppProvider, useAppContext } from './context/AppContext';

import './style.css';

function App() {
  const { svgContent, selectedElement } = useAppContext();
  const svgContainerRef = useRef();

  if (svgContent.value && svgContainerRef.current) {
    const draw = SVG(svgContent.value).addTo(svgContainerRef.current);

    selectedElement.value = draw;
  }

  return (
    <div className="min-h-svh flex flex-col">
      <h1 className="fixed text-lg text-center shadow-md rounded-md p-2 bg-white">
        SVG Manipulation Tool
      </h1>
      <div className="m-auto" ref={svgContainerRef}>
        {svgContent.value === '' && <SvgUploader />}
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
