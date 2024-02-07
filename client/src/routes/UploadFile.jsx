import React, { useState } from "react";

import taskFetch from "../axios/config";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("csv", file);

      await taskFetch.post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="upload">
      <h2 className="title-upload">Upload de Arquivo CSV</h2>
      <input type="file" onChange={handleFileChange} />
      <button className="btn" onClick={handleUpload}>
        Enviar
      </button>
    </div>
  );
};

export default UploadFile;
