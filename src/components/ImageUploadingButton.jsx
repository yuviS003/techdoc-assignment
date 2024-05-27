import { Button } from "@mui/material";
import ImageUploading from "react-images-uploading";

const ImageUploadingButton = ({ value, onChange, ...props }) => {
  return (
    <ImageUploading value={value} onChange={onChange}>
      {({ onImageUpload, onImageUpdate }) => (
        <Button
          color="primary"
          onClick={value ? onImageUpload : () => onImageUpdate(0)}
          variant="contained"
          {...props}
        >
          Upload Image to start cropping
        </Button>
      )}
    </ImageUploading>
  );
};

export default ImageUploadingButton;
