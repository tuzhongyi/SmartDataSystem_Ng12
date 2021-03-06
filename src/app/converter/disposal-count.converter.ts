import { IConverter } from '../common/interfaces/converter.interface';
import { DisposalCountType } from '../enum/disposal-count.enum';
import { EventType } from '../enum/event-type.enum';
import { Language } from '../common/tools/language';
import { DivisionNumberStatistic } from '../network/model/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../network/model/garbage-station-number-statistic.model';
import { DisposalCountModel } from '../view-model/disposal-count.model';

export type NumberStatistic =
  | DivisionNumberStatistic
  | GarbageStationNumberStatistic;

export class DisposalArrayCountConverter
  implements IConverter<NumberStatistic[], DisposalCountModel[]>
{
  private item = new DisposalCountConverter();
  Convert(source: NumberStatistic[], ...res: any[]): DisposalCountModel[] {
    let array: DisposalCountModel[] = [];
    for (let i = 0; i < source.length; i++) {
      let item = this.item.Convert(source[i]);
      array.push(item);
    }
    return array;
  }
}

export class DisposalCountConverter
  implements IConverter<NumberStatistic, DisposalCountModel>
{
  Convert(source: NumberStatistic, ...res: any[]): DisposalCountModel {
    let totalCount = 0;
    let handledCount = 0;
    let timeoutCount = 0;
    let unhandledCount = 0;

    let model = new DisposalCountModel();
    model.id = source.Id;
    model.name = source.Name;

    if (source.TodayEventNumbers) {
      let len = source.TodayEventNumbers.length;
      for (let i = 0; i < len; i++) {
        let eventNumer = source.TodayEventNumbers[i];
        if (eventNumer.EventType == EventType.GarbageDrop) {
          totalCount = eventNumer.DayNumber;
        }
        if (eventNumer.EventType == EventType.GarbageDropHandle) {
          handledCount = eventNumer.DayNumber;
        }
        if (eventNumer.EventType == EventType.GarbageDropTimeout) {
          timeoutCount = eventNumer.DayNumber;
        }
      }
    }

    unhandledCount = totalCount - handledCount;
    model.disposalCountArray = [
      {
        label: Language.DisposalCountType(DisposalCountType.total),
        count: totalCount,
        tag: DisposalCountType.total,
      },
      {
        label: Language.DisposalCountType(DisposalCountType.unhandled),
        count: unhandledCount,
        tag: DisposalCountType.unhandled,
      },
      {
        label: Language.DisposalCountType(DisposalCountType.timeout),
        count: timeoutCount,
        tag: DisposalCountType.timeout,
      },
    ];

    model.handledPercentage = ((handledCount / totalCount) * 100) >> 0;
    if (totalCount <= 0) {
      model.handledPercentage = 100;
    }
    let timeoutRatio = 0;
    if (totalCount > 0) {
      timeoutRatio = (timeoutCount / totalCount) * 100;
    }
    model.timeoutRatio = timeoutRatio;

    return model;
  }
}
