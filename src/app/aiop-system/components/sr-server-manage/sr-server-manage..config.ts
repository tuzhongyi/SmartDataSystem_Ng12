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
];
