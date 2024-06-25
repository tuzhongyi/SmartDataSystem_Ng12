import { Transform } from 'class-transformer';
import { IIdModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { GCHAEventResource } from './gcha-event-resource.model';

/**	EventRecord (垃圾事件)	*/
export class GCHAEventRecord implements IIdModel {
  /**	String	事件ID	M	*/
  Id!: string;
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	String	事件触发类型	M	*/
  TriggerType!: string;
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	EventResource[]	报警事件资源列表	O	*/
  Resources?: GCHAEventResource[];
}
