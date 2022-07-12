import { Language } from 'src/app/common/tools/language';
import { Camera } from 'src/app/network/model/camera.model';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const AiopCameraConf: TableColumnModel[] = [
  {
    columnDef: 'CameraName',
    header: '名称',
    cell: (element: AICameraManageModel) => `${element.CameraName}`,
    flexBasis: "12%"
  },
  {
    columnDef: 'CameraType',
    header: '类型',
    cell: (element: AICameraManageModel) => `${element.CameraType}`,
  },
  {
    columnDef: 'DeciveName',
    header: '编码设备',
    cell: (element: AICameraManageModel) => `${element.DeciveName}`,
  },

];


export const StationCameraConf: TableColumnModel[] = [
  {
    columnDef: 'Name',
    header: '名称',
    cell: (element: Camera) => `${element.Name}`,
    flexBasis: "12%"
  },
  {
    columnDef: 'OnlineStatus',
    header: '在线状态',
    cell: (element: Camera) => `${Language.OnlineStatus(element.OnlineStatus)}`,
  },
  {
    columnDef: 'CameraUsage',
    header: '用途',
    cell: (element: Camera) => `${Language.CameraUsage(element.CameraUsage)}`,
  },
]