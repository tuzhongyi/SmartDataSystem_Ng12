import { TableSelectStateEnum } from '../enum/table-select-state.enum';

export class TableSelectStrategy {
  constructor(public title: string, public type: TableSelectStateEnum) { }
}
