
export class FlatTreeNode {
  constructor(
    public id: string,
    public name: string,
    public level: number = 0,
    public description: string = '',
    public expandable = false,
    public parentId: string | null = null,
    public iconType: string = 'howell-icon-map5',
    public type: number = 0,
    public parentNode: FlatTreeNode | null = null,
    public rawData?: any,
  ) { }

}
