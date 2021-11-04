import { Transform } from 'class-transformer';
import { EventType } from '../../enum/event_type.enum';
import { ResourceType } from '../../enum/resource_type.enum';
import { Point } from './point.model';
import { transformDate } from './transform.model';
import { CameraImageUrl } from './url.model';

/** 事件基础类型 */
export class EventRecord {
  /**	String	事件ID	M */
  Id!: string;
  /**	DateTime	事件时间	M */
  @Transform(transformDate)
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

class EventRecordData<T> extends EventRecord {
  Data!: T;
}

/** 乱丢垃圾事件 */
export class IllegalDropEventRecord extends EventRecordData<IllegalDropEventData> {}
/** */
interface IllegalDropEventData {
  /**	String	垃圾房ID	M */
  StationId: string;
  /**	String	垃圾房名称	M */
  StationName: string;
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
}
/** 事件目标 */
export interface EventDataObject {
  /**	String	目标ID	M */
  Id: string;
  /**	Point[]	目标所在的归一化多边形	M */
  Polygon: Point[];
  /**	Double	置信度：0-100	M */
  Confidence: number;
}

/** 混合投放事件 */
export class MixedIntoEventRecord extends EventRecordData<MixedIntoEventData> {}
/** */
interface MixedIntoEventData {
  /**	String	垃圾房ID	M */
  StationId: string;
  /**	String	垃圾房名称	M */
  StationName: string;
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
/** */
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
  @Transform(transformDate)
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
export class GarbageDropEventRecord extends EventRecordData<GarbageDropEventRData> {}
/** */
class GarbageDropEventRData {
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
  @Transform(transformDate)
  DropTime!: Date;
  /**	DateTime	处置时间	O */
  @Transform(transformDate)
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
}
