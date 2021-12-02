import { BehaviorSubject } from 'rxjs';
import { DivisionType } from '../enum/division-type.enum';

export class NestedTreeNode {
  childrenChange = new BehaviorSubject<NestedTreeNode[]>([]);

  constructor(
    public id: string,
    public name: string,
    public description: string = '',
    public divisionType: DivisionType = DivisionType.City,
    public hasChildren = false,
    public parentId: string | null = null,
    public childrenLoaded = false
  ) {}
}
