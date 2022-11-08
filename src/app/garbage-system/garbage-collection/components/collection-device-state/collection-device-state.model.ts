/*
 * @Author: pmx 
 * @Date: 2022-11-08 10:04:09 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-08 10:56:28
 */
import { CollectionDeviceStateCountType, CollectionDeviceStateRatioType } from "src/app/enum/collection-device-state.enum";
import { VehicleState } from "src/app/enum/vehicle-state.enum";





export interface ICollectionDeviceStateDes {
  /**标签文本 */
  label: string;

  /**标签数量 */
  count: number;

  /**标签类型 */
  type: CollectionDeviceStateCountType;

  /**文本颜色 */
  tagCls: string;
}
export class CollectionDeviceStateModel {
  /**在线比 */
  onLineRatio: number = 0;

  /**后缀 */
  unit: string = '%';

  /**等级 */
  state: CollectionDeviceStateRatioType = CollectionDeviceStateRatioType.Good;

  /**等级颜色 */
  stateCls: string = '';

  stateDes: string = '';

  /**全部车辆、在线车辆、离线车辆 */
  deviceStateArr: Array<ICollectionDeviceStateDes> = [];

  constructor() { }
}
