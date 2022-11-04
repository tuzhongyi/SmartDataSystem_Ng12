/*
 * @Author: pmx
 * @Date: 2022-11-04 14:50:32
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-04 15:40:27
 */
import { Transform } from 'class-transformer';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehicleRelayOperator } from 'src/app/enum/vehicle-relay.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { transformDateTime } from '../../model/transform.model';
import { IParams, PagedParams } from '../IParams.interface';

export class GetGarbageVehiclesParams extends PagedParams implements IParams {
  // 清运车辆ID
  Ids?: string[];

  // 清运车辆名称，支持LIKE
  Name?: string;

  // 清运车辆类型
  VehicleType?: VehicleType;

  // 区划ID
  ParentId?: string;

  /**区划完整路径(可选)，含本节点，@进行分割，上级节点在前，支持LIKE */
  DivisionPath?: string;

  // 祖辈ID
  AncestorId?: string;

  // 区划ID为NULL
  DivisionIdNullable?: boolean;

  // IMEI串号
  IMEI?: string;

  // 车辆状态

  State?: VehicleState;

  // 唯一编号
  No?: string;

  // 车牌号码
  PlateNo?: string;
}

export class GetGarbageVehicleCamerasParams
  extends PagedParams
  implements IParams
{
  // 摄像机ID
  Ids?: string[];

  // 清运车辆ID
  GarbageVehicleIds?: string[];

  // 摄像机名称;
  Name?: string;

  // 摄像机用途
  CameraUsage?: CameraUsage;

  // 在线状态
  OnlineStatus?: OnlineStatus;

  // 所属区划
  DivisionIds?: string[];
}

export class GetGarbageVehicleRouteParams
  extends PagedParams
  implements IParams
{
  // 车辆ID
  VehicleId!: string;

  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 只检查包含垃圾桶ID的点位
  TrashCanIds?: string[];

  // 是否按时间倒序排列
  Desc?: boolean;
}

export class ResetRelayParams implements IParams {
  No!: number[];

  Operator!: VehicleRelayOperator;
}
