import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StatisticSummaryViewModel } from '../../statistic-summary.model';
import { StatisticSummaryEventRatioChartConverter } from './statistic-summary-event-ratio-chart.converter';
import { StatisticSummaryEventRatioChartViewModel } from './statistic-summary-event-ratio-chart.model';

@Injectable()
export class StatisticSummaryEventRatioChartBusiness
  implements
    IBusiness<
      StatisticSummaryViewModel[],
      StatisticSummaryEventRatioChartViewModel
    >
{
  Converter: IConverter<
    StatisticSummaryViewModel[],
    StatisticSummaryEventRatioChartViewModel
  > = new StatisticSummaryEventRatioChartConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    source: StatisticSummaryViewModel[]
  ): Promise<StatisticSummaryEventRatioChartViewModel> {
    let model = this.Converter.Convert(source);
    return model;
  }
  getData(...args: any): Promise<StatisticSummaryViewModel[]> {
    throw new Error('Method not implemented.');
  }
}
