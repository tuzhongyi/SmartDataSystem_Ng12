/*
 * @Author: pmx 
 * @Date: 2022-11-06 14:50:26 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 15:05:54
 */
import { Transform } from 'class-transformer';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { VehicleScore } from 'src/app/enum/vehicle-score.enum';
import { CompareRange } from '../../model/compare-range.model';
import { transformDateTime } from '../../model/transform.model';
import {
  IParams,
  PagedIntervalParams,
  PagedParams,
} from '../IParams.interface';

export class GetVehicleEventInfosParams extends PagedParams implements IParams {

  // 事件类型
  Types?: EventType[];

  // 事件名称，支持LIKE
  Name?: string;
}

export class GetGarbageCollectionEventRecordsParams
  extends PagedIntervalParams
  implements IParams {

  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 所属区划ID列表
  DivisionIds?: string[];

  // 清运车辆ID
  VehicleIds?: string[];

  // 清运车辆名称
  VehicleName?: string;

  // 资源ID列表
  ResourceIds?: string[];

  // 资源名称，支持LIKE
  ResourceName?: string;

  // 清运人员ID
  MemberIds?: string[];

  // 清运人员姓名
  MemberName?: string;

  // 垃圾桶ID
  TrashCanIds?: string[];

  // 垃圾桶名称
  TrashCanName?: string;

  // 垃圾桶类型
  TrashCanType?: TrashCanType;

  // 地址
  Address?: string;

  // 垃圾重量，KG
  Weight?: number;

  // 分类评分：1-差评，2-中评，3-好评
  Score?: VehicleScore;

  // 垃圾收运点ID
  CollectionPointIds?: string[];

  // 垃圾收运点名称
  CollectionPointName?: string;

  // 是否按时间倒序排列
  Desc?: boolean;


}




export class GetRelayStateChangeEventRecordsParams
  extends PagedIntervalParams
  implements IParams {

  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 所属区划ID列表
  DivisionIds?: string[];

  // 清运车辆ID
  VehicleIds?: string[];

  // 清运车辆名称
  VehicleName?: string;

  // 资源ID列表
  ResourceIds?: string[];

  // 资源名称，支持LIKE
  ResourceName?: string;

  // 是否按时间倒序排列
  Desc?: boolean;


}






export class GetVehicleOnlineEventRecordsParams
  extends PagedIntervalParams
  implements IParams {

  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 所属区划ID列表
  DivisionIds?: string[];

  // 清运车辆ID
  VehicleIds?: string[];

  // 清运车辆名称
  VehicleName?: string;

  // 资源ID列表
  ResourceIds?: string[];

  // 资源名称，支持LIKE
  ResourceName?: string;

  // 在线状态
  OnlineStatus?: OnlineStatus;

  // 是否按时间倒序排列
  Desc?: boolean;


}



export class GetCameraOnlineEventRecordsParams
  extends PagedIntervalParams
  implements IParams {

  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 所属区划ID列表
  DivisionIds?: string[];

  // 清运车辆ID
  VehicleIds?: string[];

  // 清运车辆名称
  VehicleName?: string;

  // 资源ID列表
  ResourceIds?: string[];

  // 资源名称，支持LIKE
  ResourceName?: string;



  // 摄像机ID
  CameraIds?: string[];

  // 摄像机名称
  CameraName?: string;

  // 在线状态
  OnlineStatus?: OnlineStatus;

  // 是否按时间倒序排列
  Desc?: boolean;


}

