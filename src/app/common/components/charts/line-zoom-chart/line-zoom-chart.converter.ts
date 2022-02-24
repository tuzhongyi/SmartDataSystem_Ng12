import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { LineZoomChartModel } from './line-zoom-chart.model';

export class LineZoomChartConverter
  implements
    IConverter<GarbageStationGarbageCountStatistic[], LineZoomChartModel>
{
  Convert(
    source: GarbageStationGarbageCountStatistic[],
    ...res: any[]
  ): LineZoomChartModel {
    let model = new LineZoomChartModel();
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      model.data.push({
        time: item.BeginTime,
        value: 1,
      });
    }
    return model;
  }
}
