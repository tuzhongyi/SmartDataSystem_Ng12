import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/common/components/charts/chart.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { IdNameModel } from 'src/app/network/model/model.model';
import { StatisticTime } from 'src/app/network/model/statistic-time.model';
import { GarbageStationWeightChartArgs } from '../garbage-station-weight-chart.model';

export class GarbageStationWeightChartConverter
  implements
    IConverter<GarbageStationNumberStatisticV2[], ITimeDataGroup<number>>
{
  Convert(
    input: GarbageStationNumberStatisticV2[],
    model: IdNameModel,
    args: GarbageStationWeightChartArgs
  ): ITimeDataGroup<number> {
    let data: ITimeDataGroup<number> = {
      Id: model.Id,
      Name: model.Name,
      datas: [],
    };
    let unit = args.unit;
    switch (args.unit) {
      case TimeUnit.Month:
        unit = TimeUnit.Day;
        break;
      case TimeUnit.Year:
        unit = TimeUnit.Month;
        break;
      default:
        break;
    }
    for (let i = 0; i < input.length; i++) {
      const statistic = input[i];

      let item = this.item(statistic, args.type.garbage, i);
      data.datas.push(item);
    }
    return data;
  }

  item(
    item: GarbageStationNumberStatisticV2 | DivisionNumberStatisticV2,
    type: GarbageType,
    index: number
  ): ITimeData<number> {
    let weight = item.GarbageWeights?.find((x) => x.GarbageType === type);

    let value = weight ? weight.DayWeight : 0;

    if (item instanceof DivisionNumberStatisticV2) {
      value = parseFloat((value / 1000).toFixed(3));
    }

    let data: ITimeData<number> = {
      value: value,
      time: StatisticTime.toDate(item.Time),
      index: index,
    };
    return data;
  }
}
