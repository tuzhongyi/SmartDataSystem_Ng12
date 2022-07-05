import { EncodeDeviceManageModel } from 'src/app/view-model/encode-device-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const EncodeDeviceManageConf: TableColumnModel[] = [

  {
    columnDef: 'Name',
    header: '名称',
    cell: (element: EncodeDeviceManageModel) => `${element.Name}`,
    flexBasis: "10%"
  },
  {
    columnDef: 'IPAddress',
    header: '地址',
    cell: (element: EncodeDeviceManageModel) => `${element.IPAddress}`,
    flexBasis: "20%"
  },
  {
    columnDef: 'ProtocolType',
    header: '协议类型',
    cell: (element: EncodeDeviceManageModel) => `${element.ProtocolType}`,
  },
  {
    columnDef: 'OnlineStatus',
    header: '状态',
    cell: (element: EncodeDeviceManageModel) => `${element.OnlineStatus}`,
  },

  {
    columnDef: 'DeviceType',
    header: '设备类型',
    cell: (element: EncodeDeviceManageModel) => `${element.DeviceType}`,
  },
  {
    columnDef: 'Labels',
    header: '标签',
    cell: (element: EncodeDeviceManageModel) => `【${element.Labels.length}】`,
  },
];
