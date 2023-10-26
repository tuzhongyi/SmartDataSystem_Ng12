import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { DisposalRankType } from './disposal-rank.model';

export class DisposalRankConverter
  implements IConverter<GarbageStationNumberStatistic[], RankModel[]>
{
  Convert(
    input: GarbageStationNumberStatistic[],
    type: DisposalRankType
  ): RankModel[] {
    return input.map((x) => {
      if (type === DisposalRankType.score) {
        return this.scoreConvert(x);
      } else {
        return this.ratioConvert(x);
      }
    });
  }

  scoreConvert(input: GarbageStationNumberStatistic): RankModel {
    let item = new RankModel(input);
    item.id = input.Id;
    item.name = input.Name;
    item.unit = '分';
    item.value = input.GarbageRatio ?? 0;
    item.statistic = item.value.toFixed(2);
    return item;
  }

  ratioConvert(input: GarbageStationNumberStatistic): RankModel {
    let item = new RankModel(input);
    item.id = input.Id;
    item.name = input.Name;
    item.unit = '%';

    let total = 0;
    let timeout = 0;

    if (input.TodayEventNumbers) {
      let number = input.TodayEventNumbers.find(
        (x) => x.EventType === EventType.GarbageDrop
      );
      if (number) {
        total = number.DayNumber;
      }
      number = input.TodayEventNumbers.find(
        (x) => x.EventType === EventType.GarbageDropTimeout
      );
      if (number) {
        timeout = number.DayNumber;
      }
    }
    if (total) {
      item.value = 1 - timeout / total;
    } else {
      item.value = 1;
    }

    item.statistic = (item.value * 100).toFixed(2);
    return item;
  }
}
