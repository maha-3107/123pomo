import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default function UploadFile() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return;
    const fileRef = ref(storage, `uploads/${file.name}`);
    uploadBytes(fileRef, file).then(() => {
      alert("✅ File uploaded to Firebase!");
    });
  };

  return (
    <div>
      <h3>Upload a File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
