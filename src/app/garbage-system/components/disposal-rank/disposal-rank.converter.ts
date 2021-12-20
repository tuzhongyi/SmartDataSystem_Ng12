import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { RankModel } from 'src/app/view-model/rank.model';

export class DisposalRankConverter
  implements IConverter<GarbageStationNumberStatistic[], RankModel[]>
{
  Convert(input: GarbageStationNumberStatistic[]): RankModel[] {
    return input.map((x) => {
      return this.itemConvert(x);
    });
  }

  itemConvert(input: GarbageStationNumberStatistic): RankModel {
    let item = new RankModel();
    item.id = input.Id;
    item.name = input.Name;
    item.unit = '分';
    item.value = input.GarbageRatio ?? 0;
    item.statistic = item.value.toFixed(2);
    return item;
  }
}
