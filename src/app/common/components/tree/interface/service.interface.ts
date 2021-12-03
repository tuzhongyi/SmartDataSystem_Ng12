import { BehaviorSubject } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { Division } from 'src/app/network/model/division.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

export interface ServiceInterface {
  dataChange: BehaviorSubject<NestedTreeNode[]>;
  getName(): TreeServiceEnum;
  initialize(): void;
  loadChildren(node: FlatTreeNode): void;
  // loadStation(id: string): any;

  addNode(node: NestedTreeNode): void;
  deleteNode(id: string): void;
  editNode(node: NestedTreeNode): void;
  searchNode(condition: string): Promise<NestedTreeNode[]>;
}
