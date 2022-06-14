import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

/**
 *  如果要配置 style 属性，则需要配合 Domsanitizer，有副作用
 */
export const columns: TableColumnModel[] = [
  {
    columnDef: 'ImageUrl',
    header: '图片',
    cell: (element: IllegalDropRecordModel) => `<img src=${element.ImageUrl}/>`,
    style: {},
    cls: ['picture'],
  },
  {
    columnDef: 'ResourceName',
    header: '资源名称',
    cell: (element: IllegalDropRecordModel) => `${element.ResourceName}`,
    sortHeader: true,
  },
  {
    columnDef: 'StationName',
    header: '投放点',
    cell: (element: IllegalDropRecordModel) => `${element.StationName}`,
    sortHeader: true,
  },
  {
    columnDef: 'CountyName',
    header: '街道',
    cell: (element: IllegalDropRecordModel) => `${element.CountyName}`,
    sortHeader: true,
  },
  {
    columnDef: 'CommitteeName',
    header: '居委会',
    cell: (element: IllegalDropRecordModel) => `${element.CommitteeName}`,
    sortHeader: true,
  },

  {
    columnDef: 'EventTime',
    header: '上报时间',
    cell: (element: IllegalDropRecordModel) => `${element.EventTime}`,
  },
  {
    columnDef: 'Operation',
    header: '操作',
    cell: (element: IllegalDropRecordModel) => `
      <i class="howell-icon-video" title="播放视频"></i>
      <i class="howell-icon-picturedownload"  title="下载图片"></i>
      <i class="howell-icon-videodownload" title="下载视频"></i>
      `,
    style: {},
    cls: ['operate'],
  },
];
