import { IModel } from '../model.interface';
import { GCHAEventDataObject } from './gcha-event-data-object.model';
import { GCHAEventRule } from './gcha-event-rule.model';

/**	EventResource (事件资源)	*/
export class GCHAEventResource implements IModel {
  /**	String	资源ID	M	*/
  ResourceId!: string;
  /**	String	资源类型：Camera	M	*/
  ResourceType!: string;
  /**	String	资源名称	M	*/
  ResourceName!: string;
  /**	Int32	摄像机机位	O	*/
  PositionNo?: number;
  /**	EventDataObject[]	目标	O	*/
  Objects?: GCHAEventDataObject[];
  /**	EventRule[]	事件规则	O	*/
  Rules?: GCHAEventRule[];
  /**	String	图片名称，对应摄像机名称	O	*/
  PictureName?: string;
  /**	Int64	数值	O	*/
  Value?: number;
}
