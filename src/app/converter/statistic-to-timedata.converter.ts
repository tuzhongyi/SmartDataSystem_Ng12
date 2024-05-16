import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { DivisionNumberStatisticV2 } from '../network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from '../network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { StatisticTime } from '../network/model/garbage-station/statistic-time.model';

export class StatisticToTimeDataConverter
  implements IConverter<EventNumberStatistic[], ITimeData<number>[]>
{
  Convert(
    source:
      | EventNumberStatistic[]
      | DivisionNumberStatisticV2[]
      | GarbageStationNumberStatisticV2[],
    eventType: EventType
  ): ITimeData<number>[] {
    return source.map((x) => {
      if (x instanceof DivisionNumberStatisticV2) {
        return this.DivisionNumberStatisticV2(x, eventType);
      } else if (x instanceof GarbageStationNumberStatisticV2) {
        return this.GarbageStationNumberStatisticV2(x, eventType);
      } else {
        return this.EventNumberStatistic(x, eventType);
      }
    });
  }

  private EventNumberStatistic(
    data: EventNumberStatistic,
    type: EventType
  ): ITimeData<number> {
    let count = 0;
    let event = data.EventNumbers.find((x) => x.EventType === type);
    if (event) {
      count = event.DeltaNumber ?? 0;
    }
    return {
      time: data.BeginTime,
      value: count,
    };
  }
  private DivisionNumberStatisticV2(
    data: DivisionNumberStatisticV2,
    type: EventType
  ): ITimeData<number> {
    let count = 0;
    let event = data.EventNumbers?.find((x) => x.EventType === type);
    if (event) {
      count = event.DayNumber ?? 0;
    }
    return {
      time: StatisticTime.toDate(data.Time),
      value: count,
    };
  }
  private GarbageStationNumberStatisticV2(
    data: GarbageStationNumberStatisticV2,
    type: EventType
  ): ITimeData<number> {
    let count = 0;
    let event = data.EventNumbers?.find((x) => x.EventType === type);
    if (event) {
      count = event.DayNumber ?? 0;
    }
    return {
      time: StatisticTime.toDate(data.Time),
      value: count,
    };
  }
}
