export enum FileReadType {
  ArrayBuffer,
  BinaryString,
  DataURL,
  Text,
}
export type FileResult = string | ArrayBuffer | null;
