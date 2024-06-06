import { EventType } from 'src/app/enum/event-type.enum';
import {
  IParams,
  PagedDurationParams,
  PagedParams,
} from '../IParams.interface';

export class GetEventInfosParams extends PagedParams implements IParams {
  /**	Int32[]	事件类型	O */
  Types?: EventType[];
  /**	String	事件名称，支持LIKE	O */
  Name?: string;
}

export class GetEventRecordsParams
  extends PagedDurationParams
  implements IParams
{
  /**	String[]	所属区划ID列表	O */
  DivisionIds?: string[];
  /**	String[]	垃圾房ID列表	O */
  StationIds?: string[];
  /**	String[]	资源ID列表	O */
  ResourceIds?: string[];
  /**	String	区划名称，支持LIKE	O */
  DivisionName?: string;
  /**	String	垃圾房名称，支持LIKE	O */
  StationName?: string;
  /**	String	资源名称，支持LIKE	O */
  ResourceName?: string;
  /**	Boolean	是否倒序时间排列	O */
  Desc?: boolean;
  /**	String[]	所属网格ID列表	O */
  GridCellIds?: string[];
  /**	String	网格名称，支持LIKE	O */
  GridCellName?: string;
  /**	String[]	所属小区ID列表	O */
  CommunityIds?: string[];
  /**	String	小区名称，支持LIKE	O */
  CommunityName?: string;
}

export class GarbageFeedbackParams implements IParams {
  /**	Double	反馈时距离，单位：米	O	*/
  FeedbackDistance?: number;
  /**	String	反馈人员名称	M	*/
  FeedbackUserName!: string;
  /**	String	反馈人员ID	M	*/
  FeedbackUserId!: string;
  /**	String	反馈人员手机号码	O	*/
  FeedbackUserMobileNo?: string;
  /**	Int32	1-街道管理人员，2-居委管理人员，3-志愿者，4-物业管理人员，5-其他，6-第三方。	M	*/
  FeedbackUserType!: number;
  /**	Int32	"反馈结果：
1：完成，2：误报，3：管理不规范"	M	*/
  FeedbackResult!: number;
  /**	String	反馈描述	O	*/
  FeedbackDescription?: string;
  /**	String[]	反馈照片	O	*/
  FeedbackImageUrls?: string[];
}

export class GarbageDropSuperviseParams implements IParams {
  /**	String	督办人员	O	*/
  Supervisor?: string;
  /**	String	督办时通知的人员ID	O	*/
  CallUserId?: string;
  /**	String	督办时通知的人员姓名	O	*/
  CallUserName?: string;
  /**	String	督办时通知的人员手机号码	O	*/
  CallUserMobileNo?: string;
  /**	Boolean	是否发送微信通知，默认：false不发送	O	*/
  WechatNotification?: boolean;
}
export class GarbageDropSuperviseResultParams implements IParams {
  /**	String	督办人员	O	*/
  Supervisor?: string;
  /**	Int32	"督办结果
1：完成，2：误报，3：管理不规范，4：无人响应，5：未按时间完成处置。"	M	*/
  SuperviseResult!: number;
  /**	String	督办描述	O	*/
  SuperviseDescription?: string;
}

export class GarbageDropAcceptParams implements IParams {
  /**	String	接单人员名称	M	*/
  AcceptedUserName!: string;
  /**	String	接单人员ID	M	*/
  AcceptedUserId!: string;
  /**	String	接单人员手机号码	O	*/
  AcceptedUserMobileNo?: string;
}
