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
    <div className="p-4">
      <input type="file" accept=".svg" onChange={handleFileChange} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SvgUploader;
