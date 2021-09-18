/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:11
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-14 17:03:13
 */
import { IBusiness } from 'src/app/business/Ibusiness';
import { RankModel } from 'src/app/view-model/rank.model';
import { IRankConverter } from '../../../Converter/IRankconverter.interface';

export class RankBusiness implements IRankConverter {
  private _listData: any = [];

  constructor(private _business: IBusiness) {}

  async list() {
    let data = await this._business.list<any>();
    console.log(data);
    return data;
  }
  toRank<T>(data: T): RankModel {
    return new RankModel();
  }
}
