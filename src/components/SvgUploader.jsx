import { useState } from 'preact/hooks';

import { useAppContext } from '../context/AppContext';

const MAX_SIZE = 2 * 1024 * 1024;

function SvgUploader() {
  const { svgContents } = useAppContext();
  const [error, setError] = useState('');

  async function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const newSvgContents = [];

    for (const file of files) {
      if (file.type !== 'image/svg+xml') {
        setError('Please upload valid SVG files.');
        return;
      }
      if (file.size > MAX_SIZE) {
        setError(
          `File is too large. Maximum size is ${(MAX_SIZE / (1024 * 1024)).toFixed(1)} MB.`,
        );
        return;
      }

      try {
        setError(null);
        const result = await readFileAsText(file);
        newSvgContents.push(result);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }

    svgContents.value = [...svgContents.value, ...newSvgContents];
  };

  return (
    <div className="m-auto w-full">
      <label
        htmlFor="svgFileInput"
        className="flex w-32 max-w-full mx-auto justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
      >
        Choose SVGs
      </label>
      <input
        type="file"
        id="svgFileInput"
        accept=".svg"
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}

export default SvgUploader;
