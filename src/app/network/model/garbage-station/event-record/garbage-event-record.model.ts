import { Transform } from 'class-transformer';
import { EventType } from '../../../../enum/event-type.enum';
import { ResourceType } from '../../../../enum/resource-type.enum';
import { IModel } from '../../model.interface';
import {
  transformDateTime,
  transformEventRecordData,
} from '../../transform.model';

export interface IEventRecord<T> extends IModel {
  Data: T;
}

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

export class EventRecordData<T>
  extends BaseEventRecord
  implements IEventRecord<T>
{
  @Transform((x) => transformEventRecordData(x), { toClassOnly: true })
  Data!: T;
}
