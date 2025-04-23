import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/files/upload",
        formData
      );
      setImageUrl(res.data.url);
      setError("");
    } catch (error) {
      // Logger error in text, file
      console.error(error);
      setError(`Upload failed. Try again \n ${error.message}.`);
    }
  };

  const handleUploadInput = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <input type="file" onChange={handleUploadInput} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded file" />}
    </div>
  );
};

export default FileUpload;
