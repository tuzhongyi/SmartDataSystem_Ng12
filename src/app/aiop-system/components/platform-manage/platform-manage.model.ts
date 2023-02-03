
export class PlatformManageModel {
  Id!: string;
  Name!: string;
  Url!: string;
  ProtocolType!: string;
  State!: string;
  UpdateTime!: string;
}

export interface PlatformManageSearch {
  Condition: string;
  PageIndex: number;
  PageSize: number;
}
