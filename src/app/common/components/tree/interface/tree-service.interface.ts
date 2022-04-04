import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

export interface TreeServiceInterface {

  initialize(type: UserResourceType, depth: number): Promise<NestedTreeNode[]>;

  // recurseByLevel(
  //   nodes: NestedTreeNode[],
  //   level?: number,
  // ): Promise<void>;

  // loadChildren(node: NestedTreeNode): Promise<NestedTreeNode[]>;

  // searchNode(condition: string): Promise<NestedTreeNode[]>;
}
