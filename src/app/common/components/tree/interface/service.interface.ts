import { BehaviorSubject } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNode } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

export interface ServiceInterface {
  getName(): TreeServiceEnum;

  initialize(): Promise<Division[]>;

  loadChildren(node: NestedTreeNode): Promise<Division[]>;

  searchNode(condition: string): Promise<Division[] | DivisionNode[]>;
}
