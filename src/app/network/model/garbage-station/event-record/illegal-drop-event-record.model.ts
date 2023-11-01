import { EventDataObject } from '../event-data-object.model';
import { EventRule } from '../event-rule';
import { EventRecordData } from './garbage-event-record.model';

/** 乱丢垃圾事件 */
export class IllegalDropEventRecord extends EventRecordData<IllegalDropEventData> {}
/** */
export class IllegalDropEventData {
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
