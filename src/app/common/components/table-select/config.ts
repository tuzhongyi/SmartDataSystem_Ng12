import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { TableSelectModel } from 'src/app/view-model/table-select.model';

export const config = [
  new TableSelectModel('全选', TableSelectStateEnum.All),
  new TableSelectModel('反选', TableSelectStateEnum.Reverse),
  new TableSelectModel('取消', TableSelectStateEnum.Cancel),
];
