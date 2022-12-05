import { CommonBarChartModel } from 'src/app/common/components/common-bar-chart/common-bar-chart.model';
import { CommonLineChartModel } from 'src/app/common/components/common-line-chart/common-line-chart.model';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

export class CollectionWeightLineModel<T = any> {
  LineChartModel!: CommonLineChartModel;

  Data: ICollectionWeightLineData[] = [];

  RawData?: T;
}

export interface ICollectionWeightLineData<T = any> {}

export interface ICollectionWeightLineSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  //  非空数组类型
  DivisionIds: [string, ...string[]];

  Type: TrashCanType;

  TimeUnit: TimeUnit;
}
