import { TableColumnModel } from 'src/app/view-model/table.model';
import { GarbageVehicleModel } from './garbage-vehicle-manage.model';

export const GarbageVehicleManageConf: TableColumnModel[] = [
  {
    columnDef: 'Name',
    header: '名称',
    cell: (element: GarbageVehicleModel) => `${element.Name}`,
  },
  {
    columnDef: 'VehicleType',
    header: '类型',
    cell: (element: GarbageVehicleModel) => `${element.Type}`,
  },
];
