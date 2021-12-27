import { IllegalDropRecordModel } from './illegal-drop-record.model';

export class TableColumnModel {
  constructor(
    public columnDef: string = '',
    public header: string,
    public cell: (element: any) => string,
    public style?: Partial<CSSStyleDeclaration>,
    public cls?: Array<string>
  ) {}
}

export type TableCellModel = IllegalDropRecordModel;

export interface TableCellEvent {
  column: TableColumnModel;
  event: Event;
}
