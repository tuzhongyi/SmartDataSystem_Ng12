/*
 * @Author: pmx
 * @Date: 2022-11-03 16:13:14
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 16:45:00
 */
import { plainToClass, Transform, TransformFnParams } from 'class-transformer';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { VehicleEventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehicleResourceType } from 'src/app/enum/resource-type.enum';
import { VehicleScore } from 'src/app/enum/vehicle-score.enum';
import { transformDateTime } from './transform.model';
import { GisPoint } from './gis-point.model';
import { CollectionPointClassification } from 'src/app/enum/collection-point.enum';

function EventRecordDataTransformer(params: TransformFnParams) {
  let record = params.obj as EventRecordData<any>;
  switch (record.EventType) {
    case VehicleEventType.Collection:
      return plainToClass(GarbageCollectionEventData, params.value);
    case VehicleEventType.RelayStateChange:
      return plainToClass(RelayStateChangeEventData, params.value);
    case VehicleEventType.VehicleOnline:
      return plainToClass(VehicleOnlineEventData, params.value);
    case VehicleEventType.CameraOnline:
      return plainToClass(CameraOnlineEventData, params.value);
    default:
      throw new Error('EventRecordDataTransformer unknow eventtype');
  }
}

// 事件基础类型
class BaseEventRecord {
  // 事件ID
  EventId!: string;

  // 事件时间
  @Transform(transformDateTime)
  EventTime!: Date;

  // 事件类型
  EventType!: VehicleEventType;

  // 事件描述信息
  EventDescription?: string;

  // 资源ID
  ResourceId?: string;

  // 资源类型
  ResourceType?: VehicleResourceType;

  // 资源名称
  ResourceName?: string;

  // 图片ID、图片地址
  ImageUrl?: string;

  // 录像文件ID、录像地址
  RecordUrl?: string;

  // 事件关键字
  EventIndexes?: string[];
}

class EventRecordData<T> extends BaseEventRecord {
  @Transform((x) => EventRecordDataTransformer(x), { toClassOnly: true })
  Data!: T;
}

class GarbageCollectionEventData {
  // 清运车辆ID
  VehicleId!: string;

  // 清运车辆名称
  VehicleName!: string;

  // 区划ID
  DivisionId?: string;

  // 区划名称
  DivisionName?: string;

  // 清运人员ID
  MemberId?: string;

  // 清运人员姓名
  MemberName?: string;

  // 垃圾桶ID
  TrashCanId?: string;

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

  // 坐标
  GisPoint?: GisPoint;

  // 垃圾收运点ID
  CollectionPointId?: string;

  // 垃圾收运点名称
  CollectionPointName?: string;

  // 垃圾收运点类型
  Classification?: CollectionPointClassification;
}

// 垃圾清运记录事件
export class GarbageCollectionEventRecord extends EventRecordData<GarbageCollectionEventData> {}

class RelayStateChangeEventData {
  // 清运车辆ID
  VehicleId!: string;

  // 清运车辆名称
  VehicleName!: string;

  // 区划ID
  DivisionId?: string;

  // 区划名称
  DivisionName?: string;

  // 变更后的继电器状态
  Relay!: string;
}

// 继电器状态变更事件
export class RelayStateChangeEventRecord extends EventRecordData<RelayStateChangeEventData> {}

class VehicleOnlineEventData {
  // 清运车辆ID
  VehicleId!: string;

  // 清运车辆名称
  VehicleName!: string;

  // 区划ID
  DivisionId?: string;

  // 区划名称
  DivisionName?: string;

  // 在线状态0-正常，1-离线
  OnlineStatus!: OnlineStatus;
}
// 清运车辆上线事件
export class VehicleOnlineEventRecord extends EventRecordData<VehicleOnlineEventData> {}

class CameraOnlineEventData {
  // 清运车辆ID
  VehicleId!: string;

  // 清运车辆名称
  VehicleName!: string;

  // 区划ID
  DivisionId?: string;

  // 区划名称
  DivisionName?: string;

  // 摄像机ID
  CameraId!: string;

  // 摄像机名称
  CameraName!: string;

  // 在线状态0-正常，1-离线
  OnlineStatus!: OnlineStatus;
}
// 摄像机上线事件
export class CameraOnlineEventRecord extends EventRecordData<CameraOnlineEventData> {}
