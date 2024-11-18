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
      <h1 className="fixed text-lg text-center shadow-md rounded-md p-2 bg-white">
        SVG Manipulation Tool
      </h1>
      <div className="m-auto" ref={svgContainerRef}>
        {svgContent === '' && <SvgUploader onUpload={setSvgContent} />}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app'));
