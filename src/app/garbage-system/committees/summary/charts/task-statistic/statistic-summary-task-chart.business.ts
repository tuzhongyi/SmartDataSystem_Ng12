import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StatisticSummaryViewModel } from '../../statistic-summary.model';
import { StatisticSummaryTaskChartConverter } from './statistic-summary-task-chart.converter';
import { StatisticSummaryTaskChartViewModel } from './statistic-summary-task-chart.model';

@Injectable()
export class StatisticSummaryTaskChartBusiness
  implements
    IBusiness<StatisticSummaryViewModel[], StatisticSummaryTaskChartViewModel>
{
  Converter: IConverter<
    StatisticSummaryViewModel[],
    StatisticSummaryTaskChartViewModel
  > = new StatisticSummaryTaskChartConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    source: StatisticSummaryViewModel[]
  ): Promise<StatisticSummaryTaskChartViewModel> {
    let model = this.Converter.Convert(source);
    return model;
  }
  getData(...args: any): Promise<StatisticSummaryViewModel[]> {
    throw new Error('Method not implemented.');
  }
}
