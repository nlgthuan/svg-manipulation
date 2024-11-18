import { SVG } from '@svgdotjs/svg.js';
import { render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import SvgUploader from './components/SvgUploader';

import './style.css';

function App() {
  const [svgContent, setSvgContent] = useState(null);
  const svgContainerRef = useRef();

  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      SVG(svgContent).addTo(svgContainerRef.current);
    }
  }, [svgContent]);

  return (
    <div className="app">
      <h1 className="text-2xl mb-4">SVG Manipulation Tool</h1>
      <SvgUploader onUpload={setSvgContent} />
      <div
        ref={svgContainerRef}
        className="mt-4 border p-4"
        style={{ height: '500px', width: '100%' }}
      />
    </div>
  );
}

render(<App />, document.getElementById('app'));
