import { OrderType } from 'src/app/enum/order-type.enum';
import { CompareRange } from '../../model/garbage-station/compare-range.model';
import { FeedbackResult } from '../../model/garbage-station/garbage-drop-feedback.model';
import {
  GarbageDropSuperVisionLevel,
  SupervisedState,
} from '../../model/garbage-station/garbage-drop-super-vision-data.model';
import { IParams, PagedDurationParams } from '../IParams.interface';

export class GetGarbageDropEventRecordsParams
  extends PagedDurationParams
  implements IParams
{
  [key: string]: any;
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
  /**	Boolean	是否已处置	O */
  IsHandle?: boolean;
  /**	Boolean	是否已滞留	O */
  IsTimeout?: boolean;
  /**	Boolean	是否已超级滞留	OO */
  IsSuperTimeout?: boolean;
  /**	String[]	所属小区ID列表	O */
  CommunityIds?: string[];
  /**	String	小区名称，支持LIKE	O */
  CommunityName?: string;
  /**	String	工单号，支持LIKE	O */
  RecordNo?: string;

  TakeMinutes?: CompareRange<number>;
  /**	String	处置时长排序 ASC，DESC，不区分大小写	O */
  TakeMinutesOrderBy?: OrderType;
  /**	String	落地时间排序 ASC，DESC，不区分大小写	O */
  DropTimeOrderBy?: OrderType;
  /**	String	处置时间排序 ASC，DESC，不区分大小写	O */
  HandleTimeOrderBy?: OrderType;

  /**	Int32	"督办级别
1：一级事件（垃圾落地）
2：二级事件（滞留）
3：三级事件（超级滞留）"	O	*/
  Level?: GarbageDropSuperVisionLevel;
  /**	Int32	"督办状态
0：未督办（待督办）
1：已督办"	O	*/
  SupervisedState?: SupervisedState;
  /**
   * Int32	"反馈状态 0：表示没有人员反馈。1：表示已反馈"	O	*/
  FeedbackState?: number;
  /**	Double	"反馈用时单位：秒大于的数值"	O	*/
  FeedbackSecondsGe?: number;
  /**	Double	"反馈用时单位：秒小于的数值"	O	*/
  FeedbackSecondsLe?: number;
  /**	String	反馈人员名称	O	*/
  FeedbackUserName?: string;
  /**	String	反馈人员手机号码	O	*/
  FeedbackUserMobileNo?: string;
  /**	Int32	反馈结果：1：完成，2：误报，3：管理不规范	O	*/
  FeedbackResult?: FeedbackResult;
  /**	String	反馈人员ID	O	*/
  FeedbackUserId?: string;
}
