import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectBox from "./SelectBox";

export default function Editor() {
  const [photo, setPhoto] = useState<any>(null);
  const { id } = useParams();

  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  const reload = useCallback(() => {
    axios.get("/photos/" + id).then((res) => {
      setPhoto(res.data);
      console.log(res.data);
    });
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  if (!photo || !id) return null;
  return (
    <div style={{ padding: 15 }}>
      <h1>Add Labels To Photo</h1>
      <div style={{ position: "relative" }}>
        <img
          src={photo.url}
          alt={photo.name}
          draggable={false}
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
            setDrawing(false);
            const { width, height } = e.currentTarget.getBoundingClientRect();
            if (Math.abs(startX - endX) > 20 && Math.abs(startY - endY) > 20) {
              axios
                .post("/photos/" + id + "/labels", {
                  left: Math.min(startX, endX) / width,
                  top: Math.min(startY, endY) / height,
                  width: Math.abs(startX - endX) / width,
                  height: Math.abs(startY - endY) / height,
                  catalog: "",
                })
                .then(() => {
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
        {photo.labels?.map(({ _id }: any) => (
          <SelectBox photoId={id} labelId={_id} />
        ))}
      </div>
    </div>
  );
}
