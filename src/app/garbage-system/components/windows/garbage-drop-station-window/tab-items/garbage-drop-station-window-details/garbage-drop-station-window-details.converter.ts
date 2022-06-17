import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { StatisticToTimeDataConverter } from 'src/app/converter/statistic-to-timedata.converter';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';

export class GarbageDropStationWindowDetailsConverter
  implements IConverter<EventNumberStatistic[], ITimeData<number>[][]>
{
  converter = {
    item: new StatisticToTimeDataConverter(),
  };

  Convert(
    source: EventNumberStatistic[],
    types: EventType[]
  ): ITimeData<number>[][] {
    let result = new Array();
    for (let i = 0; i < types.length; i++) {
      let item = this.converter.item.Convert(source, types[i]);
      result.push(item);
    }
    return result;
  }
}
