import { IService } from 'src/app/common/interfaces/service.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { NestTreeNode } from 'src/app/view-model/nest-tree-node.model';

export interface TreeServiceInterface extends IService {
  getName(): TreeServiceEnum;

  initialize(type?: DivisionType): Promise<NestTreeNode[]>;

  recurseByLevel(
    nodes: NestTreeNode[],
    level?: number,
  ): Promise<void>;

  loadChildren(node: NestTreeNode): Promise<NestTreeNode[]>;

  searchNode(condition: string): Promise<NestTreeNode[]>;
}
