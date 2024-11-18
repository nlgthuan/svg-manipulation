import { useState } from 'preact/hooks';

const MAX_SIZE = 2 * 1024 * 1024; // Max size in bytes (2 MB)

function SvgUploader({ onUpload }) {
  const [error, setError] = useState('');

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
    <div className="w-full">
      <label
        htmlFor="svgFileInput"
        className="flex w-32 mx-auto justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
      >
        Choose SVG
      </label>
      <input
        type="file"
        id="svgFileInput"
        accept=".svg"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}

export default SvgUploader;
