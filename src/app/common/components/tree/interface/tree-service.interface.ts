import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { NestTreeNode } from 'src/app/view-model/nest-tree-node.model';

export interface TreeServiceInterface {

  initialize(type: UserResourceType, depth: number): Promise<NestTreeNode[]>;

  // recurseByLevel(
  //   nodes: NestedTreeNode[],
  //   level?: number,
  // ): Promise<void>;

  loadChildren(node: NestTreeNode): Promise<NestTreeNode[]>;

  // searchNode(condition: string): Promise<NestedTreeNode[]>;
}
