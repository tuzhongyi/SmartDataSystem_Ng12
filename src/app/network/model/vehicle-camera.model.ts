import { Transform } from 'class-transformer';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { GisPoint } from './gis-point.model';
import { transformDateTime } from './transform.model';

/*
 * @Author: pmx
 * @Date: 2022-11-03 15:20:52
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 15:43:12
 */
export class VehicleCamera {
  // 摄像机ID
  Id!: string;

  // 摄像机名称;
  Name!: string;

  // 摄像机用途
  CameraUsage!: CameraUsage;

  // 创建时间
  @Transform(transformDateTime)
  CreateTime!: Date;

  // 更新时间
  @Transform(transformDateTime)
  UpdateTime!: Date;

  // 清运车辆ID
  GarbageVehicleId!: string;

  // 位置编号
  PositionNo?: VehiclePositionNo;

  // 在线状态
  OnlineStatus?: OnlineStatus;

  // 照片URL或ID
  ImageUrl?: string;

  // 照片时间
  @Transform(transformDateTime)
  ImageTime?: Date;

  // 当前位置GIS点位
  GisPoint?: GisPoint;
}
