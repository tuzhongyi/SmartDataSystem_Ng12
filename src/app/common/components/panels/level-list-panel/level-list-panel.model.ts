import { IObjectModel } from 'src/app/network/model/model.interface';

export interface ILevelListNode extends IObjectModel {
  Language?: string;
  ParentId?: string;
}
