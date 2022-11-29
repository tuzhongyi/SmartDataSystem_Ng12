import { InjectionToken } from '@angular/core';
import { EChartsOption, PieSeriesOption } from 'echarts';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonChartModel } from 'src/app/view-model/common-chart.model';
import { ICommonCharBusiness } from '../../interfaces/common-chart.business';

export const COMMON_PIE_CHART_TOKEN = new InjectionToken<IModel>(
  'COMMON_PIE_CHART'
);

export interface ICommonPieCharBusiness<T = any>
  extends ICommonCharBusiness<T> {}
{
}

export class CommonPieChartModel<T = any> extends CommonChartModel<T> {}
