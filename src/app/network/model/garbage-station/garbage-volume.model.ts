import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/** 垃圾容量 */
export class GarbageVolume implements IModel {
  /**	Double	当天总数量，单位：L	M */
  DayVolume!: number;
  /**	Double	当天干垃圾容量，单位：L	M */
  DayDryVolume!: number;
  /**	Double	当天湿垃圾容量，单位：L	M */
  DayWetVolume!: number;
  /**	Double	增量垃圾数量，单位：L	M */
  DeltaVolume!: number;
  /**	Double	增量干垃圾容量，单位：L	M */
  DeltaDryVolume!: number;
  /**	Double	增量湿垃圾容量，单位：L	M */
  DeltaWetVolume!: number;
  /**	Double	当前总数量，单位：L	M */
  Volume!: number;
  /**	Double	当前容量百分比，[0,1]，只有垃圾房信息中含有该值	M */
  VolumePercent!: number;
  /**	Double	当前干垃圾容量，单位：L	M */
  DryVolume!: number;
  /**	Double	当前干垃圾容量百分比，[0,1] ，只有垃圾房信息中含有该值	M */
  DryVolumePercent!: number;
  /**	Double	当前湿垃圾容量，单位：L	M */
  WetVolume!: number;
  /**	Double	当前湿垃圾容量百分比，[0,1] ，只有垃圾房信息中含有该值	M */
  WetVolumePercent!: number;
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
}
