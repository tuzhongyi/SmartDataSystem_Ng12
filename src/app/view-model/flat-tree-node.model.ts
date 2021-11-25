export class FlatTreeNode {
  constructor(
    public id: string,
    public name: string,
    public level: number,
    public expandable = false,
    public parentId: string | null = null,
    public hide = false
  ) {}
}
