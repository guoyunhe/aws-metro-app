import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Editor() {
  const [photo, setPhoto] = useState<any>(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get("/photos/" + id).then((res) => {
      setPhoto(res.data);
      console.log(res.data);
    });
  }, [id]);
  if (!photo) return null;
  return (
    <div style={{ padding: 15 }}>
      <h1>Photo Editor</h1>
      <img src={photo.url} alt={photo.name} />
    </div>
  );
}
