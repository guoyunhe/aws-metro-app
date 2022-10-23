import Label from "./Label";

export default interface Photo {
  _id: string;
  name: string;
  key: string;
  bucket: string;
  mimetype: string;
  url: string;
  labels: Label[];
}
