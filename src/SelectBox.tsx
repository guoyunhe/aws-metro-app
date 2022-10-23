import axios from "axios";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export interface SelectBoxProps {
  photoId: string;
  labelId: string;
}

export default function SelectBox({ labelId, photoId }: SelectBoxProps) {
  const [label, setLabel] = useState<any>(null);

  const reload = useCallback(() => {
    axios.get("/photos/" + photoId + "/labels/" + labelId).then((res) => {
      setLabel(res.data);
    });
  }, [photoId, labelId]);

  const handleDelete = useCallback(() => {
    axios.delete("/photos/" + photoId + "/labels/" + labelId).then((res) => {
      setLabel(null);
    });
  }, [photoId, labelId]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setLabel((prev: any) => ({ ...prev, catalog: e.target.value }));
      axios.patch("/photos/" + photoId + "/labels/" + labelId, {
        catalog: e.target.value,
      });
    },
    [photoId, labelId]
  );

  useEffect(() => {
    reload();
  }, [reload]);

  if (!label) return null;

  return (
    <div
      style={{
        position: "absolute",
        border: "1px solid black",
        boxShadow: "0 0 0 1px white,0 0 0 1px white inset",
        left: label.left * 100 + "%",
        top: label.top * 100 + "%",
        width: label.width * 100 + "%",
        height: label.height * 100 + "%",
      }}
    >
      <label
        style={{
          background: "black",
          color: "white",
        }}
      >
        Catalog:
        <select value={label.catalog} onChange={handleChange}>
          <option>Street Sign</option>
          <option>Train</option>
          <option>Station</option>
          <option>Passenger</option>
        </select>
      </label>
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "white" }}
      >
        Delete
      </button>
    </div>
  );
}
