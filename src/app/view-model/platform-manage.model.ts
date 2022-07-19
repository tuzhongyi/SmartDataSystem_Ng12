import { CommonModel } from "./common-model";

export class PlatformManageModel implements CommonModel {
  Id!: string;
  Name!: string;
  Url!: string;
  ProtocolType!: string;
  State!: string;
  UpdateTime!: string;
  constructor() { }
}