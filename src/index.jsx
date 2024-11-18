import { render } from 'preact';
import { useState } from 'preact/hooks';

import SvgUploader from './components/SvgUploader';

import './style.css';

function App() {
  const [svgContent, setSvgContent] = useState(null);

  const handleSvgUpload = (content) => {
    setSvgContent(content);
  };

  return (
    <div className="app">
      <h1 className="text-2xl mb-4">SVG Manipulation Tool</h1>
      <SvgUploader onUpload={handleSvgUpload} />
      {svgContent && (
        <div
          className="mt-4 border p-4"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
}
render(<App />, document.getElementById('app'));
