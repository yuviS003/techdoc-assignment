import { useState, useCallback, useEffect } from "react";
import DragAndDropUpload from "./components/DragAndDropUpload";
import ImageCropper from "./components/ImageCropper";

const App = () => {
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const imageFiles = acceptedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles([...files, ...imageFiles]);
    },
    [files]
  );

  const handleCropButtonClick = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {files.length === 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Drag and Drop File Upload</h1>
          <DragAndDropUpload files={files} onDrop={onDrop} />
        </>
      ) : (
        <>
          <div className="mt-4 w-full max-w-2xl">
            {files.length > 0 && (
              <div className="mt-4">
                <h2 className="text-2xl mb-4">Uploaded Files</h2>
                <div className="grid grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        onClick={() => handleCropButtonClick(file)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Crop
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {selectedImage && <ImageCropper imgSrc={selectedImage} />}
    </div>
  );
};

export default App;
