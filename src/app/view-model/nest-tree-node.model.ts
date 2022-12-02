import { BehaviorSubject } from 'rxjs';

export class NestTreeNode<T = any> {
  childrenChange = new BehaviorSubject<NestTreeNode[]>([]);

  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public type: number = 0,
    public hasChildren = false,
    public parentId?: string,
    public iconType: string = 'howell-icon-map5',
    public childrenLoaded = false,
    public parentNode?: NestTreeNode,
    public rawData?: T
  ) {}
}
