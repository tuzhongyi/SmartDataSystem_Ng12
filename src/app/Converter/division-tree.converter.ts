import { NestedTreeNode } from '../view-model/nested-tree-node.model';

export interface DivisionTreeConverter<F> {
  toNestedTreeModel<T>(data: T[], ...res: any[]): F[];
}
