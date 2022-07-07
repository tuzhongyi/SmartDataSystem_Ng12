import { TreeBusinessEnum } from "src/app/enum/tree-business.enum";
import { NestTreeNode } from "src/app/view-model/nest-tree-node.model";

export interface TreeBusinessInterface {

  nestedNodeMap: Map<string, NestTreeNode>;

  model: any;

  depthIsEnd: any;

  getName(): TreeBusinessEnum;

  initialize(...res: any[]): Promise<NestTreeNode[]>;

  loadChildren(node: NestTreeNode): Promise<NestTreeNode[]>;

  searchNode(condition: string, ...res: any[]): Promise<NestTreeNode[]>;
}