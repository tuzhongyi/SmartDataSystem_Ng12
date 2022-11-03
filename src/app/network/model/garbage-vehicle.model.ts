/*
 * @Author: pmx
 * @Date: 2022-11-03 15:00:35
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 15:42:33
 */

import { Transform, Type } from 'class-transformer';
import { RelayState } from 'src/app/enum/relay-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GisPoint } from './gis-point.model';
import { transformDateTime } from './transform.model';
import { VehicleCamera } from './vehicle-camera.model';

export class GarbageVehicle {
  // 车辆ID
  Id!: string;

  // 车辆名称
  Name!: string;

  // 车辆类型;
  VehicleType!: VehicleType;

  // 描述信息
  Description?: string;

  // 创建时间
  @Transform(transformDateTime)
  CreateTime!: Date;

  // 更新事件
  @Transform(transformDateTime)
  UpdateTime!: Date;

  // 当前位置GIS点位
  GisPoint?: GisPoint;

  // 所属区划ID
  DivisionId?: string;

  // 摄像机列表
  @Type(() => VehicleCamera)
  Cameras?: VehicleCamera[];

  // IMEI串号
  IMEI?: string;

  // 唯一编号
  No!: string;

  // 车辆状态
  state?: VehicleState;

  // 心跳间隔,单位：秒，默认5秒
  HeartbeatInterval?: number = 5;

  // 自动关闭时间，最小600，最大14400
  ShutdownSeconds?: number;

  // 继电器数量
  RelayCount?: number;

  // 继电器状态，0-关闭，1-打开
  RelayState?: RelayState;

  // 车牌号码
  PlateNo?: string;
}
