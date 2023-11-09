import { IIdNameModel } from 'src/app/network/model/model.interface';

export interface ILevelListNode extends IIdNameModel {
  Language?: string;
  ParentId?: string;
}
