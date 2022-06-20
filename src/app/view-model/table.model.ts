export type TableRowModel = any;

export class TableColumnModel {
  constructor(
    public columnDef: string = '', // 唯一
    public header: string = '',
    public cell: (row: TableRowModel) => string,
    public flexBasis?: string,
    public stopPropogate?: boolean,
    public sortHeader?: boolean,
    public className?: Array<string>
  ) { }
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