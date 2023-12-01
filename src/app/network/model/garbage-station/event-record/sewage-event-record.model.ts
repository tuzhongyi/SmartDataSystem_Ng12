import { Transform } from 'class-transformer';
import { transformDateTime } from '../../transform.model';
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
  /**	DateTime	处置时间	O	*/
  @Transform(transformDateTime)
  HandleTime?: Date;
  /**	Boolean	是否已处置	O	*/
  IsHandle?: boolean;
  /**	String	图片ID、图片地址	O	*/
  HandleImageUrl?: string;
  /**	Boolean	处置人员是否已处置	O	*/
  Processed?: boolean;
  /**	String	处置人员名称	O	*/
  ProcessorName?: string;
  /**	String	处置人员ID	O	*/
  ProcessorId?: string;
  /**	String	手机号码	O	*/
  ProcessorMobileNo?: string;
  /**	DateTime	处置时间	O	*/
  @Transform(transformDateTime)
  ProcessTime?: Date;
  /**	String	处置描述	O	*/
  ProcessDescription?: string;
}
