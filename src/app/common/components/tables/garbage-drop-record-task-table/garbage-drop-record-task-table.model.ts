import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { IModel } from 'src/app/network/model/model.interface';

export class GarbageDropRecordTaskTableModel {
  [key: string]: number | string;
  name: string = '';
  count = 0;
  unhandle = 0;
  handle = 0;
  timeout = 0;
  ratio = '100%';
}
export interface IGarbageDropRecordTaskTableBusiness
  extends IBusiness<IModel, GarbageDropRecordTaskTableModel[]> {
  total(
    datas: GarbageDropRecordTaskTableModel[]
  ): GarbageDropRecordTaskTableModel;
  division: IDivision;
}

export interface IDivision {
  Id: string;
  DivisionType: DivisionType;
  Name?: string;
}
