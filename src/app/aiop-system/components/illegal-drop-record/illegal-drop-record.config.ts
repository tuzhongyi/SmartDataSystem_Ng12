import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

/**
 *  如果要配置 style 属性，则需要配合 Domsanitizer，有副作用
 */
export const IllegalDropEventRecordConf: TableColumnModel[] = [
  {
    columnDef: 'ImageUrl',
    header: '图片',
    cell: (row: IllegalDropRecordModel) => `<img src=${row.ImageUrl}/>`,
    stopPropogate: true
  },
  {
    columnDef: 'ResourceName',
    header: '资源名称',
    cell: (row: IllegalDropRecordModel) => `${row.ResourceName}`,
    sortHeader: true,
  },
  {
    columnDef: 'StationName',
    header: '投放点',
    cell: (row: IllegalDropRecordModel) => `${row.StationName}`,
    sortHeader: true,
  },
  {
    columnDef: 'CountyName',
    header: '街道',
    cell: (row: IllegalDropRecordModel) => `${row.CountyName}`,
    sortHeader: true,
  },
  {
    columnDef: 'CommitteeName',
    header: '居委会',
    cell: (row: IllegalDropRecordModel) => `${row.CommitteeName}`,
    sortHeader: true,
  },

  {
    columnDef: 'CommunityName',
    header: '社区',
    cell: (row: IllegalDropRecordModel) => `${row.CommunityName}`,
    sortHeader: true,
  },

  {
    columnDef: 'EventTime',
    header: '上报时间',
    cell: (row: IllegalDropRecordModel) => `${row.EventTime}`,
  },
  {
    columnDef: 'Operation',
    header: '操作',
    cell: (row: IllegalDropRecordModel) => `
        <i class="howell-icon-video" title="播放视频" ></i>
        <i class="howell-icon-picturedownload"  title="下载图片"></i>
        <i class="howell-icon-videodownload" title="下载视频"></i>
      `,
    className: ['operation'],
    stopPropogate: true
  },
];
