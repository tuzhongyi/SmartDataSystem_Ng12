import { IllegalDropTotalModel } from 'src/app/view-model/illegal-drop-total.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const IllegalDropTotalConf: TableColumnModel[] = [

  {
    columnDef: 'Name',
    header: '行政区',
    cell: (element: IllegalDropTotalModel) => `${element.Name}`,
  },
  {
    columnDef: 'ParentName',
    header: '上级区划',
    cell: (element: IllegalDropTotalModel) => `${element.ParentName}`,
  },

];
