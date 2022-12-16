export class CollectionMemberWindowModel<T = any> {
  Id!: string;

  Name!: string;

  Gender!: string;

  MobileNo!: string;

  MemberType!: string;

  DivisionName!: string;

  No!: string;
  RawData?: T;
}

export interface ICollectionMemberWindowSearchInfo {
  DivisionId: string;
  PageIndex: number;
  PageSize: number;
  Condition: string;
}
