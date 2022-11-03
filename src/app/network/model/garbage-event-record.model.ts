import {
  plainToClass,
  Transform,
  TransformationType,
  TransformFnParams,
} from 'class-transformer';
import { EventType } from '../../enum/event-type.enum';
import { ResourceType } from '../../enum/resource-type.enum';
import { EventDataObject } from './event-data-object.model';
import { EventRule } from './event-rule';
import { IModel } from './model.interface';
import { Point } from './point.model';
import { transformDateTime } from './transform.model';
import { CameraImageUrl } from './url.model';

/** 事件基础类型 */
export class BaseEventRecord implements IModel {
  /**	String	事件ID	M */
  EventId!: string;
  /**	DateTime	事件时间	M */
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M */
  EventType!: EventType;
  /**	String	事件描述信息	O */
  EventDescription?: string;
  /**	String	资源ID	O */
  ResourceId?: string;
  /**
   * 	String	资源类型：
   *  Camera：监控点
   *  EncodeDevice：编码设备
   *  IoTSensor：物联网传感器
   *  GarbageStation：垃圾房	O
   */
  ResourceType?: ResourceType;

  /**	String	资源名称	O */
  ResourceName?: string;
  /**	String	图片ID、图片地址	O */
  ImageUrl?: string;
  /**	String	录像文件ID、录像地址	O */
  RecordUrl?: string;
  /**	String[]	事件关键字	O */
  EventIndexes?: string[];
}

class EventRecordData<T> extends BaseEventRecord {
  @Transform((x) => EventRecordDataTransformer(x), { toClassOnly: true })
  Data!: T;
}

/** 乱丢垃圾事件 */
export class IllegalDropEventRecord extends EventRecordData<IllegalDropEventData> {}
/** */
class IllegalDropEventData {
  CommunityName?: string;
  CommunityId?: string;
  /**	String	垃圾房ID	M */
  StationId!: string;
  /**	String	垃圾房名称	M */
  StationName!: string;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	区划名称	O */
  DivisionName?: string;
  /**	EventDataObject[]	垃圾的目标	O */
  Objects?: EventDataObject[];
  /**	String	网格单元ID	O */
  GridCellId?: string;
  /**	String	网格单元名称	O */
  GridCellName?: string;
  /**	EventRule[]	事件规则	O */
  Rules?: EventRule[];
}

/** 混合投放事件 */
export class MixedIntoEventRecord extends EventRecordData<MixedIntoEventData> {}

class MixedIntoEventData {
  /**	String	垃圾房ID	M */
  StationId!: string;
  /**	String	垃圾房名称	M */
  StationName!: string;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	区划名称	O */
  DivisionName?: string;
  /**	EventDataObject[]	垃圾的目标	O */
  Objects?: EventDataObject[];
  /**	String[]	图片ID、图片地址列表	O */
  PersonImageUrls?: string[];
  /**	String	网格单元ID	O */
  GridCellId?: string;
  /**	String	网格单元名称	O */
  GridCellName?: string;
}

/**
 * 垃圾满溢事件
 * Data	GarbageFullEventData	事件数据	M
 *
 * */
export class GarbageFullEventRecord extends EventRecordData<GarbageFullEventData> {}

class GarbageFullEventData {
  /**	String	垃圾房ID	M */
  StationId!: string;
  /**	String	垃圾房名称	M */
  StationName!: string;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	区划名称	O */
  DivisionName?: string;
  /**	DateTime	第一次满溢时间	M */
  @Transform(transformDateTime)
  FullTime!: Date;
  /**	String[]	图片ID、图片地址列表	O */
  ImageUrls?: string[];
  /**	CameraImageUrl[]	图片ID、图片地址列表	O */
  CameraImageUrls?: CameraImageUrl[];
  /**	String	网格单元ID	O */
  GridCellId?: string;
  /**	String	网格单元名称	O */
  GridCellName?: string;
}

/**
 *  小包垃圾落地事件
 *  Data	GarbageDropEventData	事件数据	M
 */
export class GarbageDropEventRecord
  extends EventRecordData<GarbageDropEventData>
  implements IModel {}
/** */
export class GarbageDropEventData {
  /**	String	垃圾房ID	M */
  StationId!: string;
  /**	String	垃圾房名称	M */
  StationName!: string;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	区划名称	O */
  DivisionName?: string;
  /**	String	网格单元ID	O */
  GridCellId?: string;
  /**	String	网格单元名称	O */
  GridCellName?: string;
  /**	DateTime	落地时间	M */
  @Transform(transformDateTime)
  DropTime!: Date;
  /**	DateTime	处置时间	O */
  @Transform(transformDateTime)
  HandleTime?: Date;
  /**	Boolean	小包垃圾落地是否已处置	M */
  IsHandle!: boolean;
  /**	Boolean	是否滞留	M */
  IsTimeout!: boolean;
  /**	CameraImageUrl[]	垃圾落地的图片ID、图片地址列表	O */
  DropImageUrls?: CameraImageUrl[];
  /**	CameraImageUrl[]	垃圾处置的图片ID、图片地址列表	O */
  HandleImageUrls?: CameraImageUrl[];
  /**	CameraImageUrl[]	滞留的图片ID、图片地址列表	O */
  TimeoutImageUrls?: CameraImageUrl[];
  /**	Boolean	处置人员是否已处置	O */
  Processed?: boolean;
  /**	String	处置人员名称	O */
  ProcessorName?: string;
  /**	String	处置人员ID	O */
  ProcessorId?: string;
  /**	String	手机号码	O */
  ProcessorMobileNo?: string;
  /**	DateTime	处置时间	O */
  @Transform(transformDateTime)
  ProcessTime?: Date;
  /**	String	处置描述	O */
  ProcessDescription?: string;
  /**	String	小区ID	O */
  CommunityId?: string;
  /**	String	小区名称	O */
  CommunityName?: string;
  /**	String	工单号	O */
  RecordNo?: string;

  /**	String	滞留时间	O */
  TakeMinutes?: number;
}

function EventRecordDataTransformer(params: TransformFnParams) {
  let record = params.obj as EventRecordData<any>;
  switch (record.EventType) {
    case EventType.GarbageDrop:
    case EventType.GarbageDropHandle:
    case EventType.GarbageDropTimeout:
      return plainToClass(GarbageDropEventData, params.value);
    case EventType.GarbageFull:
      return plainToClass(GarbageFullEventData, params.value);
    case EventType.IllegalDrop:
      return plainToClass(IllegalDropEventData, params.value);
    case EventType.MixedInto:
      return plainToClass(MixedIntoEventData, params.value);

    default:
      throw new Error('EventRecordDataTransformer unknow eventtype');
  }
}
