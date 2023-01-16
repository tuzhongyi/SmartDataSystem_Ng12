import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { TableSelectStrategy } from 'src/app/view-model/table-select.model';

export const config = [
  new TableSelectStrategy('全选', TableSelectType.All),
  new TableSelectStrategy('反选', TableSelectType.Reverse),
  new TableSelectStrategy('取消', TableSelectType.Cancel),
];
