import { SVG } from '@svgdotjs/svg.js';
import { render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import SvgUploader from './components/SvgUploader';

import './style.css';

function App() {
  const [svgContent, setSvgContent] = useState('');
  const svgContainerRef = useRef();

  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      SVG(svgContent).addTo(svgContainerRef.current);
    }
  }, [svgContent]);

  return (
    <div className="min-h-svh flex flex-col">
      <h1 className="text-2xl mb-4 text-center">SVG Manipulation Tool</h1>
      <div
        ref={svgContainerRef}
        className="border p-4 m-4 mb-16 h-[calc(100svh-130px)] overflow-auto flex items-center justify-center"
      >
        {svgContent === '' && <SvgUploader onUpload={setSvgContent} />}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app'));
