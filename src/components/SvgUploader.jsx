import { useState } from 'preact/hooks';

const MAX_SIZE = 2 * 1024 * 1024; // Max size in bytes (2 MB)

function SvgUploader({ onUpload }) {
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'image/svg+xml') {
        setError('Please upload a valid SVG file.');
        return;
      }
      if (file.size > MAX_SIZE) {
        setError(
          `File is too large. Maximum size is ${(MAX_SIZE / (1024 * 1024)).toFixed(1)} MB.`,
        );
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="svgFileInput"
      >
        Upload SVG File
      </label>
      <input
        type="file"
        id="svgFileInput"
        accept=".svg"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-indigo-500"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default SvgUploader;
