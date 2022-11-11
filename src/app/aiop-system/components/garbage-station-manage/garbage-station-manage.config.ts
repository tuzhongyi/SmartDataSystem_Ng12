import { GarbageStationManageModel } from 'src/app/view-model/garbage-station-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const GarbageStationManageConf: TableColumnModel[] = [
  {
    columnDef: 'Name',
    header: '名称',
    cell: (element: GarbageStationManageModel) => `${element.Name}`,
  },
  {
    columnDef: 'StationType',
    header: '类型',
    cell: (element: GarbageStationManageModel) => `${element.StationType}`,
  },
];
