import { IllegalDropRecordModel } from './illegal-drop-record.model';

export class TableColumnModel {
  constructor(
    public columnDef: string = '',
    public header: string,
    public cell: (element: any) => string,
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
