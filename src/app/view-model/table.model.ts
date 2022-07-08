export type TableRowModel = any;

export interface TableColumnModel {
  columnDef: string; // 唯一
  header: string;
  cell: (row: TableRowModel) => string;
  flexBasis?: string;
  stopPropogate?: boolean;
  sortHeader?: boolean;
  className?: Array<string>;
}



export interface TableCellEvent {
  column: TableColumnModel;
  row: TableRowModel;
  event: Event;
}

export class TableOperateModel {
  constructor(
    public id: string,
    public classNames: string | string[],
    public title: string,
    public callBack: (row: TableRowModel, event: Event) => any
  ) { }
}