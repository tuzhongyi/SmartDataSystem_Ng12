import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { RankModel } from 'src/app/view-model/rank.model';
export type IllegalMixintoDataResource =
  | DivisionNumberStatistic
  | GarbageStationNumberStatistic;
export class IllegalMixintoRankConverter
  implements IConverter<IllegalMixintoDataResource[], RankModel[]>
{
  itemConvert(input: IllegalMixintoDataResource, type: EventType): RankModel {
    let model = new RankModel(type);
    model.id = input.Id;
    model.name = input.Name;
    if (input.TodayEventNumbers) {
      let numbers = input.TodayEventNumbers.find((x) => x.EventType === type);
      if (numbers) {
        model.value = numbers.DayNumber;
      }
      model.unit = '起';
      model.statistic = model.value.toString();
    }
    return model;
  }

  Convert(input: IllegalMixintoDataResource[], type: EventType): RankModel[] {
    let array = new Array<RankModel>();
    for (let i = 0; i < input.length; i++) {
      const item = this.itemConvert(input[i], type);
      array.push(item);
    }
    return array;
  }
}
