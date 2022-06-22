import { EventType } from "src/app/enum/event-type.enum";
import { ResourceType } from "src/app/enum/resource-type.enum";

/** 事件基础类型 */
export class EventRecord {
  /**事件ID */
  EventId!: string;
  /**事件时间 */
  EventTime!: Date | string;
  /**事件类型 */
  EventType!: EventType;
  /**事件描述信息 */
  EventDescription?: string;
  /**资源ID	*/
  ResourceId?: string;
  /**资源类型 */
  ResourceType?: ResourceType;
  /**资源名称 */
  ResourceName?: string;
  /**图片ID、图片地址	 */
  ImageUrl?: string;
  /**录像文件ID、录像地址 */
  RecordUrl?: string;
  /**	事件关键字 */
  EventIndexes?: string[];
}
