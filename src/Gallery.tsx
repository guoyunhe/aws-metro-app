import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "./types/Photo";

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  useEffect(() => {
    axios.get("/photos/").then((res) => {
      setPhotos(res.data || []);
    });
  }, []);
  return (
    <div style={{ padding: 15 }}>
      <h1>Gallery</h1>
      <div style={{ margin: -8 }}>
        {photos.map((photo) => (
          <Link to={"/photos/" + photo._id}>
            {photo.mimetype.startsWith("image/") ? (
              <img
                key={photo._id}
                src={photo.url}
                alt={photo.originalname}
                style={{
                  width: 300,
                  height: 300,
                  objectFit: "cover",
                  objectPosition: "center",
                  margin: 8,
                }}
              />
            ) : (
              <video
                style={{
                  width: 300,
                  height: 300,
                  objectFit: "cover",
                  objectPosition: "center",
                  margin: 8,
                }}
              >
                <source src={photo.url} type={photo.mimetype}></source>
              </video>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
