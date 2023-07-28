import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** 建筑垃圾箱数据 */
export class ConstructionData implements IModel {
  /**	String	配对编号，目前只有建筑垃圾投放箱有此属性	O */
  MatchGuid?: string;

  /**	Double	垃圾容量百分比：[0-100]，目前只有建筑垃圾投放箱有此属性	O */
  PercentageOfCapacity?: number;
  /**	Double	电量百分比：[0-100] ，目前只有建筑垃圾投放箱有此属性	O */
  PercentageOfBattery?: number;
  /**	Double	温度，单位：摄氏度，目前只有建筑垃圾投放箱有此属性	O */
  Temperture?: number;
  /**	DateTime	更新时间	O */
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	Double	经度	O */
  Longitude?: number;
  /**	Double	纬度	O */
  Latitude?: number;
  /**	String	制造商：赫得，坝上	O */
  Manufacturer?: string;
}
