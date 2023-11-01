import { EventDataObject } from '../event-data-object.model';
import { EventRecordData } from './garbage-event-record.model';

/** 混合投放事件 */
export class MixedIntoEventRecord extends EventRecordData<MixedIntoEventData> {}

export class MixedIntoEventData {
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
