import { BehaviorSubject } from 'rxjs';
import { DivisionType } from '../enum/division-type.enum';
import { UserResourceType } from '../enum/user-resource-type.enum';
import { Division } from '../network/model/division.model';
import { GarbageStation } from '../network/model/garbage-station.model';

export class NestTreeNode {
  childrenChange = new BehaviorSubject<NestTreeNode[]>([]);

  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public type: number = 0,
    public hasChildren = false,
    public parentId: string | null = null,
    public iconType: string = 'howell-icon-map5',
    public childrenLoaded = false,
    public parentNode: NestTreeNode | null = null,
    public rawData?: any
  ) { }
}
