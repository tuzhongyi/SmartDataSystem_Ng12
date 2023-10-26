import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';

export class StatisticToTimeDataConverter
  implements IConverter<EventNumberStatistic[], ITimeData<number>[]>
{
  Convert(
    source: EventNumberStatistic[],
    eventType: EventType
  ): ITimeData<number>[] {
    return source.map((x) => {
      let count = 0;
      let event = x.EventNumbers.find((x) => x.EventType === eventType);
      if (event) {
        count = event.DeltaNumber ?? 0;
      }
      return {
        time: x.BeginTime,
        value: count,
      };
    });
  }
}
