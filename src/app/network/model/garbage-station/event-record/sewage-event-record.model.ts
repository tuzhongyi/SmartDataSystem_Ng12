import { CameraImageUrl } from '../../url.model';
import { EventDataObject } from '../event-data-object.model';
import { EventRule } from '../event-rule';
import { EventRecordData } from './garbage-event-record.model';

/** 混合投放事件 */
export class SewageEventRecord extends EventRecordData<SewageEventData> {}

export class SewageEventData {
  /**	String	垃圾房ID	M	*/
  StationId!: string;
  /**	String	垃圾房名称	M	*/
  StationName!: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	EventDataObject[]	垃圾的目标	O	*/
  Objects?: EventDataObject[];
  /**	String	网格单元ID	O	*/
  GridCellId?: string;
  /**	String	网格单元名称	O	*/
  GridCellName?: string;
  /**	String	小区ID	O	*/
  CommunityId?: string;
  /**	String	小区名称	O	*/
  CommunityName?: string;
  /**	EventRule[]	事件规则	O	*/
  Rules?: EventRule[];
  /**	CameraImageUrl[]	"图片ID、图片地址列表
   * 暂时无效"	O
   **/
  CameraImageUrls?: CameraImageUrl[];
}
