import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectBox from "./SelectBox";
import Photo from "./types/Photo";

export default function Editor() {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const goto = useNavigate();
  const { id } = useParams();

  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  const reload = useCallback(() => {
    axios.get("/photos/" + id).then((res) => {
      setPhoto(res.data);
    });
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  if (!photo || !id) return null;

  const Media = photo.mimetype.startsWith("video/") ? "video" : "img";

  return (
    <div style={{ padding: 15 }}>
      <h1>
        {photo.originalname}
        <button
          onClick={() => {
            axios.delete("/photos/" + id);
            goto("/");
          }}
        >
          Delete
        </button>
      </h1>
      <div style={{ position: "relative" }}>
        <Media
          src={photo.url}
          alt={photo.originalname}
          draggable={false}
          controls
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            userSelect: "none",
          }}
          onMouseDown={(e) => {
            setDrawing(true);
            const { left, top } = e.currentTarget.getBoundingClientRect();
            setStartX(e.clientX - left);
            setStartY(e.clientY - top);
            setEndX(e.clientX - left);
            setEndY(e.clientY - top);
          }}
          onMouseMove={(e) => {
            if (drawing) {
              const { left, top } = e.currentTarget.getBoundingClientRect();
              setEndX(e.clientX - left);
              setEndY(e.clientY - top);
            }
          }}
          onMouseUp={(e) => {
            const { width, height } = e.currentTarget.getBoundingClientRect();
            setDrawing(false);
            const data = {
              left: Math.min(startX, endX) / width,
              top: Math.min(startY, endY) / height,
              width: Math.abs(startX - endX) / width,
              height: Math.abs(startY - endY) / height,
              catalog: "",
            };
            setPhoto({
              ...photo,
              labels: [...photo.labels, { ...data, _id: "new" }],
            });
            if (Math.abs(startX - endX) > 20 && Math.abs(startY - endY) > 20) {
              axios.post("/photos/" + id + "/labels", data).then(() => {
                reload();
              });
            }
          }}
        />
        <div
          style={{
            display: drawing ? "block" : "none",
            position: "absolute",
            left: Math.min(startX, endX),
            top: Math.min(startY, endY),
            width: Math.abs(startX - endX),
            height: Math.abs(startY - endY),
            border: "1px solid black",
            boxShadow: "0 0 0 1px white,0 0 0 1px white inset",
            pointerEvents: "none",
          }}
        />
        {photo.labels.map(({ _id }) => (
          <SelectBox key={_id} photoId={id} labelId={_id} />
        ))}
      </div>
    </div>
  );
}
