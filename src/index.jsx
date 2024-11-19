import { signal } from '@preact/signals';
import { SVG } from '@svgdotjs/svg.js';
import { render } from 'preact';
import { useRef } from 'preact/hooks';

import SvgUploader from './components/SvgUploader';
import ToolBox from './components/ToolBox';

import './style.css';

const svgContent = signal('');
const selectedElement = signal(null);

function App() {
  const svgContainerRef = useRef();

  if (svgContent.value && svgContainerRef.current) {
    const draw = SVG(svgContent.value).addTo(svgContainerRef.current);

    draw.each(function () {
      this.on('click', () => {
        selectedElement.value = this.node;
      });
    });
  }

  return (
    <div className="min-h-svh flex flex-col">
      <h1 className="fixed text-lg text-center shadow-md rounded-md p-2 bg-white">
        SVG Manipulation Tool
      </h1>
      <div className="m-auto" ref={svgContainerRef}>
        {svgContent.value === '' && <SvgUploader svgContent={svgContent} />}
      </div>
      <ToolBox selectedElement={selectedElement} />
    </div>
  );
}

render(<App />, document.getElementById('app'));
