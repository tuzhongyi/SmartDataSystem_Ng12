import { InjectionToken } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonChartModel } from 'src/app/view-model/common-chart.model';
import { ICommonCharBusiness } from '../../interfaces/common-chart.business';

export const COMMON_GAUGE_CHART_TOKEN = new InjectionToken<IModel>(
  'COMMON_GAUGE_CHART'
);

export interface ICommonGaugeCharBusiness<T = any>
  extends ICommonCharBusiness<T> {}

export class CommonGaugeChartModel<T = any> extends CommonChartModel<T> {}
