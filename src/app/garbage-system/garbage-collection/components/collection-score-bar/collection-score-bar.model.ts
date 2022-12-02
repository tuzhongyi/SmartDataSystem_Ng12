import { CommonBarChartModel } from 'src/app/common/components/common-bar-chart/common-bar-chart.model';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

export class CollectionScoreBarModel<T = any> {
  BarChartModel!: CommonBarChartModel;

  Data: ICollectionScoreBarData[] = [];

  RawData?: T;
}

export interface ICollectionScoreBarData<T = any> {}

export interface ICollectionScoreBarSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  //  非空数组类型
  DivisionIds: [string, ...string[]];

  TimeUnit?: TimeUnit;
}
