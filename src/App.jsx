import { useState } from "react";
import "./App.css";
import ImageUploadingButton from "./components/ImageUploadingButton";
import ImageCropper from "./components/ImageCropper";
import CroppedImageView from "./components/CroppedImageView";

export default function App() {
  const [image, setImage] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="App">
      <ImageUploadingButton
        value={image}
        onChange={(newImage) => {
          setDialogOpen(true);
          setImage(newImage);
        }}
      />
      <ImageCropper
        open={dialogOpen}
        image={image.length > 0 && image[0].dataURL}
        onComplete={(imagePromisse) => {
          imagePromisse.then((image) => {
            setCroppedImage(image);
            setDialogOpen(false);
          });
        }}
        containerStyle={{
          position: "relative",
          width: "100%",
          height: 300,
          background: "#333",
        }}
      />
      {croppedImage && <CroppedImageView croppedImage={croppedImage} />}
    </div>
  );
}
