import { IService } from 'src/app/common/interfaces/service.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

export interface TreeServiceInterface extends IService {
  getName(): TreeServiceEnum;

  initialize(type?: DivisionType, level?: number): Promise<NestedTreeNode[]>;

  loadChildren(node: NestedTreeNode): Promise<NestedTreeNode[]>;

  searchNode(condition: string): Promise<NestedTreeNode[]>;
}
