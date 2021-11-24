import { NestedTreeNode } from '../view-model/nested-tree-node.model';

export interface DivisionTreeConverter<F> {
  toNestedTree<T>(data: T[], ...res: any[]): F[];
}
