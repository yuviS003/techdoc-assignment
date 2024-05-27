import { Button } from "@mui/material";

const CroppedImageView = ({ croppedImage }) => {
  const downloadImage = () => {
    // Convert the base64 image data to a Blob object
    const byteCharacters = atob(croppedImage.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "image.jpg";

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const uploadToServer = () => {
    // Base64 encoded image data
    const base64Data = croppedImage;

    // Convert base64 string to Blob
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // Create FormData object and append the blob
    const formData = new FormData();
    formData.append("image", blob, "image.jpg");

    // Make a fetch call to upload the file
    fetch("your_upload_url", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
        return response.json();
      })
      .then((data) => {
        // Handle success response
        console.log("Image uploaded successfully:", data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className="croppedImageContainer">
      <img src={croppedImage} alt="blab" />
      <div className="croppedImageContainer-controls">
        <Button variant="contained" color="success" onClick={downloadImage}>
          Download this Image
        </Button>
        <Button variant="outlined" color="warning" onClick={uploadToServer}>
          Upload this image on server
        </Button>
      </div>
    </div>
  );
};

export default CroppedImageView;
