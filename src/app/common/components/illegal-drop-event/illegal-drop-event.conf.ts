import { IllegalDropEventModel } from 'src/app/view-model/illegal-drop-event.model';
import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

/**
 *  如果要配置 style 属性，则需要配合 Domsanitizer，有副作用
 */
export const IllegalDropEventConf: TableColumnModel[] = [
  {
    columnDef: 'ImageUrl',
    header: '图片',
    cell: (element: IllegalDropEventModel) => `<img src=${element.ImageUrl}/>`,
  },
  {
    columnDef: 'ResourceName',
    header: '资源名称',
    cell: (element: IllegalDropEventModel) => `${element.ResourceName}`,
    sortHeader: true,
  },
  {
    columnDef: 'StationName',
    header: '投放点',
    cell: (element: IllegalDropEventModel) => `${element.StationName}`,
    sortHeader: true,
  },
  {
    columnDef: 'CountyName',
    header: '街道',
    cell: (element: IllegalDropEventModel) => `${element.CountyName}`,
    sortHeader: true,
  },
  {
    columnDef: 'CommitteeName',
    header: '居委会',
    cell: (element: IllegalDropEventModel) => `${element.CommitteeName}`,
    sortHeader: true,
  },

  {
    columnDef: 'EventTime',
    header: '上报时间',
    cell: (element: IllegalDropRecordModel) => `${element.EventTime}`,
  },

];
