
export class TableColumnModel<T = any> {
  constructor(
    public columnDef: string = '', // 唯一
    public header: string = '',
    public cell: (element: T) => string,
    public flexBasis?: string,
    public stopPropogate?: boolean,
    public sortHeader?: boolean,
    public className?: Array<string>
  ) { }
}


export type TableRowModels = any;

export interface TableCellEvent {
  column: TableColumnModel;
  row: TableRowModels;
  event: PointerEvent;
}
