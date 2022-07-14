import { BehaviorSubject } from "rxjs";
import { CommonTreeModel } from "./common-tree.model";

export class CommonNestNode<T = any> implements CommonTreeModel {

  readonly childrenChange = new BehaviorSubject<CommonNestNode[]>([]);

  Id!: string;
  Name!: string;
  HasChildren!: boolean;
  ParentId!: string | null;
  ChildrenLoaded!: boolean;
  ParentNode!: CommonNestNode | null;
  IconClass!: string;
  RawData!: T
}