import { AIModelManageModel } from 'src/app/view-model/ai-model-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const AIModelManageConf: TableColumnModel[] = [
  {
    columnDef: 'ImageUrl',
    header: '图片',
    cell: (element: AIModelManageModel) => `<img src="${element.LabelIcon}"/>`,
  },
  {
    columnDef: 'Name',
    header: '模型名称',
    cell: (element: AIModelManageModel) => `${element.Name}`,
  },
  {
    columnDef: 'ModelType',
    header: '模型类型',
    cell: (element: AIModelManageModel) => `${element.ModelType}`,
  },
  {
    columnDef: 'TransformType',
    header: '应用类型',
    cell: (element: AIModelManageModel) => `${element.TransformType}`,
  },
  {
    columnDef: 'Version',
    header: '版本',
    cell: (element: AIModelManageModel) => `${element.Version}`,
  },

  {
    columnDef: 'UpdateTime',
    header: '更新时间',
    cell: (element: AIModelManageModel) => `${element.UpdateTime}`,
  },
];
