import { Guid } from '../../tools/guid';
import {
  CommonRankData,
  CommonRankModel,
  ICommonRankBusiness,
} from './common-rank.model';

export class CommonRankBusiness implements ICommonRankBusiness {
  init(): CommonRankModel<any> | Promise<CommonRankModel<any>> {
    let model = new CommonRankModel();
    // for (let i = 0; i < 10; i++) {
    //   let item = new CommonRankData();
    //   item.Id = Guid.NewGuid().ToString('N');
    //   let unicode1 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
    //   let unicode2 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
    //   let unicode3 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
    //   item.Name = String.fromCodePoint(unicode1, unicode2, unicode3);
    //   item.Number = (Math.random() * 100) >> 0;
    //   item.Unit = '只';

    //   model.Data.push(item);
    // }
    return model;
  }
}
