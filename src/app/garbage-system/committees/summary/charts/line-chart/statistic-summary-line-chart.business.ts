import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { StatisticSummaryIllegalDropChartConverter } from './statistic-summary-line-chart.converter';
import { StatisticSummaryLineChartViewModel } from './statistic-summary-line-chart.model';

@Injectable()
export class StatisticSummaryIllegalDropChartBusiness
  implements
    IBusiness<EventNumberStatistic[], StatisticSummaryLineChartViewModel>
{
  Converter: IConverter<
    EventNumberStatistic[],
    StatisticSummaryLineChartViewModel
  > = new StatisticSummaryIllegalDropChartConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    source: EventNumberStatistic[],
    type: EventType,
    unit: TimeUnit
  ): Promise<StatisticSummaryLineChartViewModel> {
    let model = this.Converter.Convert(source, type, unit);
    return model;
  }
  getData(...args: any): Promise<EventNumberStatistic[]> {
    throw new Error('Method not implemented.');
  }
}
