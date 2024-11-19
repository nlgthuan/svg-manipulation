import { signal } from '@preact/signals';
import { SVG } from '@svgdotjs/svg.js';
import { render } from 'preact';
import { useRef } from 'preact/hooks';

import SvgUploader from './components/SvgUploader';

import './style.css';

const svgContent = signal('');

function App() {
  const svgContainerRef = useRef();

  if (svgContent.value && svgContainerRef.current) {
    SVG(svgContent.value).addTo(svgContainerRef.current);
  }

  return (
    <div className="min-h-svh flex flex-col">
      <h1 className="fixed text-lg text-center shadow-md rounded-md p-2 bg-white">
        SVG Manipulation Tool
      </h1>
      <div className="m-auto" ref={svgContainerRef}>
        {svgContent.value === '' && <SvgUploader svgContent={svgContent} />}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app'));
