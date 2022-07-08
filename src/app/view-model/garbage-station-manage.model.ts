import { StationType } from "../enum/station-type.enum";
import { CommonModel } from "./common-model";

export class GarbageStationManageModel implements CommonModel {
  Id!: string;
  Name!: string;
  StationType!: string;
}