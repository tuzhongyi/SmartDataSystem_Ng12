import { EventNumberStatisticModel } from 'src/app/view-model/illegal-drop-total.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const IllegalDropStatisticConf: TableColumnModel[] = [

  {
    columnDef: 'Name',
    header: '行政区',
    cell: (element: EventNumberStatisticModel) => `${element.Name}`,
  },
  {
    columnDef: 'ParentName',
    header: '上级区划',
    cell: (element: EventNumberStatisticModel) => `${element.ParentModel?.Name ?? '-'}`,
  },
  {
    columnDef: 'EventNumber',
    header: '垃圾落地',
    cell: (element: EventNumberStatisticModel) => `${element.EventNumber}`,
  },

];

export const MixIntoStatisticConf: TableColumnModel[] = [

  {
    columnDef: 'Name',
    header: '行政区',
    cell: (element: EventNumberStatisticModel) => `${element.Name}`,
  },
  {
    columnDef: 'ParentName',
    header: '上级区划',
    cell: (element: EventNumberStatisticModel) => `${element.ParentModel?.Name ?? '-'}`,
  },
  {
    columnDef: 'EventNumber',
    header: '垃圾落地',
    cell: (element: EventNumberStatisticModel) => `${element.EventNumber}`,
  },

];
