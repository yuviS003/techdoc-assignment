import { useDropzone } from "react-dropzone";

const DragAndDropUpload = ({ files, onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Only accept image files
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer ${
        isDragActive ? "bg-blue-100" : "bg-white"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">
        {isDragActive
          ? "Drop the files here ..."
          : "Drag 'n' drop some image files here, or click to select files"}
      </p>
      <div className="mt-4 w-full">
        {files.map((file, index) => (
          <div key={index} className="bg-gray-100 p-2 mt-2 rounded">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDropUpload;
