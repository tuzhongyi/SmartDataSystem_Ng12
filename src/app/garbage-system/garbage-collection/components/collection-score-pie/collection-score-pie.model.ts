import { EChartsOption } from 'echarts';
import { CommonPieChartModel } from 'src/app/common/components/common-pie-chart/common-pie-chart.model';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

export class CollectionScorePieModel<T = any> {
  pieCharMerge: EChartsOption = {};

  Data: ICollectionScorePieData[] = [];

  RawData?: T;
}

export interface ICollectionScorePieData<T = any> {
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

export interface ICollectionScorePieSearchInfo {
  DivisionId: string;
}
