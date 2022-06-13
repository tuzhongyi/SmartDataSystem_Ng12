import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { StatisticSummaryStationEventChartConverter } from './statistic-summary-station-event-chart.converter';
import { StatisticSummaryStationEventChartViewModel } from './statistic-summary-station-event-chart.model';

@Injectable()
export class StatisticSummaryStationEventChartBusiness
  implements
    IBusiness<
      GarbageStationNumberStatisticV2[],
      StatisticSummaryStationEventChartViewModel[]
    >
{
  Converter: IConverter<
    GarbageStationNumberStatisticV2[],
    StatisticSummaryStationEventChartViewModel[]
  > = new StatisticSummaryStationEventChartConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    source: GarbageStationNumberStatisticV2[]
  ): Promise<StatisticSummaryStationEventChartViewModel[]> {
    let model = this.Converter.Convert(source);
    return model;
  }
  getData(...args: any): Promise<GarbageStationNumberStatisticV2[]> {
    throw new Error('Method not implemented.');
  }
}
