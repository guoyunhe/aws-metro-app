import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/photos/").then((res) => {
      setPhotos(res.data || []);
      console.log(res.data);
    });
  }, []);
  return (
    <div style={{ padding: 15 }}>
      <h1>Gallery</h1>
      {photos.map((photo: any) => (
        <img key={photo._id} src={photo.url} />
      ))}
    </div>
  );
}
