import { CommonChartModel } from 'src/app/view-model/common-chart.model';

export interface ICommonCharBusiness<T = any> {
  init(...args: any): Promise<CommonChartModel<T>> | CommonChartModel<T>;
}
