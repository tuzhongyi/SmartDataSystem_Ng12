import { IllegalDropRecordModel } from './illegal-drop-record.model';

export class TableColumnModel<T = any> {
  constructor(
    public columnDef: string = '',
    public header: string,
    public cell: (element: T) => string,
    public sortHeader?: boolean,
    public style?: Partial<CSSStyleDeclaration>,
    public cls?: Array<string>
  ) {}
}

// 暂时只有一种类型
export type TableCellModel = IllegalDropRecordModel;

export interface TableCellEvent {
  column: TableColumnModel;
  event: PointerEvent;
}
