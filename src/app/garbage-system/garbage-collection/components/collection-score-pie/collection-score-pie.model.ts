export class CollectionScorePieModel<T = any> {
  Id!: string;

  Name!: string;

  // 评价总数量
  TotalCount!: number;

  // 数量详情
  CountDes!: CollectionScoreDes[];

  RawData?: T;
}

export class CollectionScoreDes<T = any> {
  Count!: number;
  Label!: string;
  RawData?: T;
}

export interface ICollectionScorePieSearchInfo {
  DivisionId: string;
}
