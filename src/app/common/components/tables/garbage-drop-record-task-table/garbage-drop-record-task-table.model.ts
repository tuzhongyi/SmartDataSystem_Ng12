import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IDivision } from 'src/app/network/model/garbage-station/division.model';
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
  ): Promise<GarbageDropRecordTaskTableModel>;
  division: Promise<IDivision>;
}
