/*
 * @Author: pmx
 * @Date: 2022-11-08 10:04:09
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-09 16:23:08
 */
import { CommonGaugeChartModel } from 'src/app/common/components/common-gauge-chart/common-gauge-chart.model';
import {
  CollectionDeviceStateCountType,
  CollectionDeviceStateRatioType,
} from 'src/app/enum/collection-device-state.enum';

export class CollectionDeviceStateModel {
  /**在线比 */
  onLineRatio: number = 0;

  /**后缀 */
  unit: string = '%';

  /**等级 */
  state: CollectionDeviceStateRatioType = CollectionDeviceStateRatioType.Good;

  /**等级颜色 */
  stateColor: string = '';

  GaugeChartModel!: CommonGaugeChartModel;

  /**全部车辆、在线车辆、离线车辆 */
  Data: Array<ICollectionDeviceStateData> = [];

  constructor() {}
}
export interface ICollectionDeviceStateData {
  /**标签文本 */
  label: string;

  /**标签数量 */
  count: number;

  /**标签类型 */
  type: CollectionDeviceStateCountType;

  /**文本颜色 */
  tagCls: string;

  /* 文本颜色 */
  tagColor: string;
}

export interface ICollectionDeviceStateSearchInfo {
  DivisionId?: string;

  PageIndex?: number;
  PageSize?: number;
}
