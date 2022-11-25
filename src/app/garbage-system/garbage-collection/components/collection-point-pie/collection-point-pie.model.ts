import { EChartsOption } from 'echarts';
import { CommonPieChartModel } from 'src/app/common/components/common-pie-chart/common-pie-chart.model';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

export class CollectionPointPieModel<T = any> {
  pieCharModel!: CommonPieChartModel;

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

export interface ICollectionPointPieSearchInfo {
  DivisionIds?: string[];
  Classifications?: CollectionPointClassification[];
}
