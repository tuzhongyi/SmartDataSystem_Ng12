import { EChartsOption } from 'echarts';
import { CommonPieChartModel } from 'src/app/common/components/common-pie-chart/common-pie-chart.model';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';

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
  Type: CollectionPointClassification;

  /**文本颜色 */
  Tagcls: string;

  RawData?: T;
}

export interface ICollectionPointPieSearchInfo {
  DivisionIds?: string[];
  Classifications?: CollectionPointClassification[];
}