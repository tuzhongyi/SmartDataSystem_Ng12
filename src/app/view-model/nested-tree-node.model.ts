import { BehaviorSubject } from 'rxjs';
import { DivisionType } from '../enum/division-type.enum';

export class NestedTreeNode {
  childrentChange = new BehaviorSubject<NestedTreeNode[]>([]);

  constructor(
    public id: string,
    public name: string,
    public divisionType: DivisionType,
    public hasChildren = false,
    public parentId: string | null = null
  ) {}
}
