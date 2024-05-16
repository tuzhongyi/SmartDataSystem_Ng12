import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { StatisticToTimeDataConverter } from 'src/app/converter/statistic-to-timedata.converter';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';

export class EventRecordWindowDetailsConverter
  implements
    IConverter<
      | EventNumberStatistic[]
      | DivisionNumberStatisticV2[]
      | GarbageStationNumberStatisticV2[],
      ITimeData<number>[][]
    >
{
  converter = {
    item: new StatisticToTimeDataConverter(),
  };
  Convert(
    source:
      | EventNumberStatistic[]
      | GarbageStationNumberStatisticV2[]
      | DivisionNumberStatisticV2[],
    types: EventType[]
  ): ITimeData<number>[][] {
    let array = new Array();
    for (let i = 0; i < types.length; i++) {
      let item = this.converter.item.Convert(source, types[i]);
      array.push(item);
    }
    return array;
  }
}
