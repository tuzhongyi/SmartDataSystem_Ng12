import { CommonModel } from "./common-model";

export class SRServerManageModel implements CommonModel {
  Id!: string;
  Name!: string;
  ProtocolType!: string;
  Username!: string;
  Password!: string;

  constructor() { }

}