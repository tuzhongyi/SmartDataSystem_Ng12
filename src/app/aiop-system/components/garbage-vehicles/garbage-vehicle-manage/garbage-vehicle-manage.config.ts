import { TableColumnModel } from 'src/app/view-model/table.model';
import { GarbageVehicleModel } from './garbage-vehicle-manage.model';

export const GarbageVehicleManageConf: TableColumnModel[] = [
  {
    columnDef: 'No',
    header: '编号',
    cell: (element: GarbageVehicleModel) => `${element.No}`,
  },
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
  {
    columnDef: 'PlateNo',
    header: '车牌号码',
    cell: (element: GarbageVehicleModel) => `${element.PlateNo}`,
  },
];
