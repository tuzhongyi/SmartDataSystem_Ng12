import { InjectionToken } from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonChartModel } from 'src/app/view-model/common-chart.model';
import { ICommonCharBusiness } from '../../interfaces/common-chart.business';

export const COMMON_BAR_CHART_TOKEN = new InjectionToken<IModel>(
  'COMMON_BAR_CHART'
);

export interface ICommonBarCharBusiness<T = any>
  extends ICommonCharBusiness<T> {}
{
}

export class CommonBarChartModel<T = any> extends CommonChartModel<T> {}
