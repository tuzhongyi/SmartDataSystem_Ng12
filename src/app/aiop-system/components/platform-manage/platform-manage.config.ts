import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import { PlatformManageModel } from 'src/app/view-model/platform-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

/**
 *  如果要配置 style 属性，则需要配合 Domsanitizer，有副作用
 */
export const PlatformManageConf: TableColumnModel[] = [
  {
    columnDef: 'Name',
    header: '名称',
    cell: (element: PlatformManageModel) => `${element.Name}`,
    sortHeader: true,
  },
  {
    columnDef: 'Url',
    header: '地址',
    cell: (element: PlatformManageModel) => `${element.Url}`,
    sortHeader: true,
  },
  {
    columnDef: 'ProtocolType',
    header: '协议类型',
    cell: (element: PlatformManageModel) => `${element.ProtocolType}`,
    sortHeader: true,
  },
  {
    columnDef: 'State',
    header: '状态',
    cell: (element: PlatformManageModel) => `${element.State}`,
    sortHeader: true,
  },

  {
    columnDef: 'UpdateTime',
    header: '更新时间',
    cell: (element: PlatformManageModel) => `${element.UpdateTime}`,
    sortHeader: true,
  },

  // {
  //   columnDef: 'Operation',
  //   header: '操作',
  //   cell: (element: PlatformManageModel) => `
  //     <i class="howell-icon-video" title="播放视频"></i>
  //     <i class="howell-icon-picturedownload"  title="下载图片"></i>
  //     <i class="howell-icon-videodownload" title="下载视频"></i>
  //     `,
  //   style: {},
  //   cls: ['operate'],
  // },
];
