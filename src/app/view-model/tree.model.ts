type toastType = 'show' | 'success' | 'error' | 'info' | 'warning';
export class SearchedTreeModel {
  constructor(
    public type: toastType = 'show',
    public msg: string = '',
    public data: Array<any> = [],
    public expand = false
  ) {}
}
