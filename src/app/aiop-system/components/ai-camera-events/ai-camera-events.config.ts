import { AICameraEventsModel } from 'src/app/view-model/ai-camera-events.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const AICameraEventsConf: TableColumnModel[] = [
  {
    columnDef: 'ImageUrl',
    header: '图片',
    cell: (element: AICameraEventsModel) => `<img src=${element.ImageUrl}/>`,
  },
  {
    columnDef: 'EventType',
    header: '事件类型',
    cell: (element: AICameraEventsModel) => `${element.EventType}`,
  },
  {
    columnDef: 'ModelName',
    header: '模型名称',
    cell: (element: AICameraEventsModel) => `${element.ModelName}`,
  },
  {
    columnDef: 'ResourceType',
    header: '设备类型',
    cell: (element: AICameraEventsModel) => `${element.ResourceType}`,
  },
  {
    columnDef: 'ResourceName',
    header: '设备名称',
    cell: (element: AICameraEventsModel) => `${element.ResourceName}`,
  },

  {
    columnDef: 'EventTime',
    header: '上报时间',
    cell: (element: AICameraEventsModel) => `${element.EventTime}`,
  },
];
