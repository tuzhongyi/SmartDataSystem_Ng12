import { TableSelectStateEnum } from '../enum/table-select-state.enum';

export class TableSelectModel {
  constructor(public title: string, public type: TableSelectStateEnum) {}
}
