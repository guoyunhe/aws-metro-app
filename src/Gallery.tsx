import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div style={{ margin: -8 }}>
        {photos.map((photo: any) => (
          <Link to={"/photos/" + photo._id}>
            <img
              key={photo._id}
              src={photo.url}
              alt={photo.name}
              style={{
                width: 300,
                height: 300,
                objectFit: "cover",
                objectPosition: "center",
                margin: 8,
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
