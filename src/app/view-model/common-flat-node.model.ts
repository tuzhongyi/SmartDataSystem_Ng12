import { CommonTreeModel } from "./common-tree.model";

export class CommonFlatNode<T = any> implements CommonTreeModel {
  Id!: string;
  Name!: string;
  Level!: number;
  Expandable!: boolean;
  ParentId!: string | null;
  ParentNode!: CommonFlatNode | null;
  IconClass!: string;
  RawData!: T
}