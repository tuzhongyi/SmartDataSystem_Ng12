import { InjectionToken } from '@angular/core';
import {
  LineSeriesOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonChartModel } from 'src/app/view-model/common-chart.model';
import { ICommonCharBusiness } from '../../interfaces/common-chart.business';

export const COMMON_LINE_CHART_TOKEN = new InjectionToken<IModel>(
  'COMMON_LINE_CHART'
);

export interface ICommonLineCharBusiness<T = any>
  extends ICommonCharBusiness<T> {}
{
}

export class CommonLineChartModel<T = any> extends CommonChartModel<T> {}
