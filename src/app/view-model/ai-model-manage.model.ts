import { CommonModel } from "./common-model";

// AI模型列表
export class AIModelManageModel implements CommonModel {

  Id!: string;
  Name!: string;
  LabelIcon!: string;
  ModelType?: string;
  TransformType?: string;
  Version?: string;
  UpdateTime!: string

  constructor() { }
}