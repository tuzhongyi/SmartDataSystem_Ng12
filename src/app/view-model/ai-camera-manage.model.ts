import { ResourceLabel } from "../network/model/resource-label.model";
import { CommonModel } from "./common-model";

export class AICameraManageModel implements CommonModel {
  Id!: string;
  Name!: string;
  CameraType!: string;
  CameraState!: string;
  DeciveName!: string;
  Labels!: ResourceLabel[];
}



export interface AICameraManageSearchInfo {
  condition: string;
  CameraName: string;
  CameraType: string;
  DeviceName: string;
  Labels: string[];
  filter: boolean;
}