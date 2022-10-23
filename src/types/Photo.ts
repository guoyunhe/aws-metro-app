import Label from "./Label";

export default interface Photo {
  _id: string;
  originalname: string;
  key: string;
  bucket: string;
  mimetype: string;
  url: string;
  labels: Label[];
}
