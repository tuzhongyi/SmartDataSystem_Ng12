import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { TableSelectStrategy } from 'src/app/view-model/table-select.model';

export const config = [
  new TableSelectStrategy('全选', TableSelectStateEnum.All),
  new TableSelectStrategy('反选', TableSelectStateEnum.Reverse),
  new TableSelectStrategy('取消', TableSelectStateEnum.Cancel),
];
