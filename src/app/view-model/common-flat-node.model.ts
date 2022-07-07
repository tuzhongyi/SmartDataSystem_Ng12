export class CommonFlatNode<T = any> {
  Id!: string;
  Name!: string;
  Level!: number;
  Expandable!: boolean;
  ParentId!: string | null;
  ParentNode!: CommonFlatNode | null;
  IconClass!: string;
  RawData!: T
}