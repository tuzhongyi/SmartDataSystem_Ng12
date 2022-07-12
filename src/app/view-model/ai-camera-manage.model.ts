import { ResourceLabel } from "../network/model/resource-label.model";

export class AICameraManageModel {
  CameraId!: string;
  CameraName!: string;
  CameraType!: string;
  CameraState!: string;
  DeciveName!: string;
  Labels!: ResourceLabel[];
}