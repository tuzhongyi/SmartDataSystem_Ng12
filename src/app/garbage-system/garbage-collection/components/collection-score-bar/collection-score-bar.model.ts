import { EChartsOption } from 'echarts';
import { CommonPieChartModel } from 'src/app/common/components/common-pie-chart/common-pie-chart.model';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

export class CollectionPointPieModel<T = any> {
  PieCharModel!: CommonPieChartModel;

  Data: ICollectionPointPieData[] = [];

  RawData?: T;
}

export interface ICollectionPointPieData<T = any> {
  /**标签文本 */
  Label: string;

  /**标签数量 */
  Count: number;

  /**标签类型 */
  Type: CollectionPointScore;

  /**文本颜色 */
  Tagcls: string;

  RawData?: T;
}

export interface ICollectionScoreBarSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  //  非空数组类型
  DivisionIds: [string, ...string[]];

  TimeUnit?: TimeUnit;
}
