import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StatisticSummaryViewModel } from '../statistic-summary.model';
import { StatisticSummaryHeaderConverter } from './statistic-summary-header.converter';
import { StatisticSummaryHeaderViewModel } from './statistic-summary-header.model';

@Injectable()
export class StatisticSummaryHeaderBusiness
  implements
    IBusiness<StatisticSummaryViewModel[], StatisticSummaryHeaderViewModel>
{
  Converter: IConverter<
    StatisticSummaryViewModel[],
    StatisticSummaryHeaderViewModel
  > = new StatisticSummaryHeaderConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    source: StatisticSummaryViewModel[]
  ): Promise<StatisticSummaryHeaderViewModel> {
    let model = this.Converter.Convert(source);
    return model;
  }
  getData(...args: any): Promise<StatisticSummaryViewModel[]> {
    throw new Error('Method not implemented.');
  }
}
