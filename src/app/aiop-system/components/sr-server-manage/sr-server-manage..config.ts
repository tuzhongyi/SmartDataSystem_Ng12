import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import { SRServerManageModel } from 'src/app/view-model/sr-server-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

/**
 *  如果要配置 style 属性，则需要配合 Domsanitizer，有副作用
 */
export const SRServerManageConf: TableColumnModel[] = [
  {
    columnDef: 'Name',
    header: '名称',
    cell: (element: SRServerManageModel) => `${element.Name}`,
  },
  {
    columnDef: 'ProtocolType',
    header: '协议类型',
    cell: (element: SRServerManageModel) => `${element.ProtocolType}`,
  },
  {
    columnDef: 'Username',
    header: '用户名',
    cell: (element: SRServerManageModel) => `${element.Username}`,
  },

  {
    columnDef: 'Password',
    header: '密码',
    cell: (element: SRServerManageModel) => `${element.Password}`,
  },
  // {
  //   columnDef: 'Operation',
  //   header: '操作',
  //   cell: (row: IllegalDropRecordModel) => `
  //       <i class="fa fa-retweet operate-icon" title="同步" id="sync" ></i>
  //       <i class="howell-icon-modification operate-icon"  title="编辑" id="edit"></i>
  //       <i class="howell-icon-delete-bin operate-icon" title="删除" id="delete"></i>
  //     `,
  //   className: ['operation'],
  //   stopPropogate: true
  // },
];
