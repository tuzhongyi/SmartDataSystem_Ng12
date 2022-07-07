import { BehaviorSubject } from "rxjs";

export class CommonNestNode<T = any> {

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