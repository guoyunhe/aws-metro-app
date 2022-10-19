import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const goto = useNavigate();
  return (
    <div style={{ padding: 15 }}>
      <h1>Upload</h1>
      <input
        type="file"
        accept="image/jpeg,image/gif,image/png"
        multiple
        onChange={(e) => {
          if (e.target.files?.length) {
            const data = new FormData();
            const files = Array.from(e.target.files);
            files.forEach((file) => {
              data.append("file", file);
            });
            axios
              .post("/photos", data, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then(() => {
                goto("/");
              })
              .catch(console.error);
          }
        }}
      />
    </div>
  );
}
