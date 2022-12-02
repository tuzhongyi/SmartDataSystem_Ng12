export class FlatTreeNode<T = any> {
  constructor(
    public id: string,
    public name: string,
    public level: number = 0,
    public description: string = '',
    public expandable = false,
    public parentId?: string,
    public iconType: string = 'howell-icon-map5',
    public type: number = 0,
    public parentNode?: FlatTreeNode<T>,
    public rawData?: T
  ) {}
}
