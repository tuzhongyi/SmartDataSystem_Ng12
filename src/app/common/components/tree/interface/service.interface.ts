import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

export interface ServiceInterface {
  getName(): TreeServiceEnum;

  initialize(): Promise<NestedTreeNode[]>;

  loadChildren(node: NestedTreeNode): Promise<NestedTreeNode[]>;

  searchNode(condition: string): Promise<NestedTreeNode[]>;
}
