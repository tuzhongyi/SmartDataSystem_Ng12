import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../../model.interface';
import { transformDateTime } from '../../transform.model';
import { CameraImageUrl } from '../../url.model';
import { GarbageDropFeedback } from '../garbage-drop-feedback.model';
import { GarbageDropSuperVisionData } from '../garbage-drop-super-vision-data.model';
import { GisPoint } from '../gis-point.model';
import { EventRecordData } from './garbage-event-record.model';

/**
 *  小包垃圾落地事件
 *  Data	GarbageDropEventData	事件数据	M
 */
export class GarbageDropEventRecord
  extends EventRecordData<GarbageDropEventData>
  implements IModel {}
/** */
export class GarbageDropEventData {
  /**	String	垃圾房ID	M */
  StationId!: string;
  /**	String	垃圾房名称	M */
  StationName!: string;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	区划名称	O */
  DivisionName?: string;
  /**	String	网格单元ID	O */
  GridCellId?: string;
  /**	String	网格单元名称	O */
  GridCellName?: string;
  /**	DateTime	落地时间	M */
  @Transform(transformDateTime)
  DropTime!: Date;
  /**	DateTime	处置时间	O */
  @Transform(transformDateTime)
  HandleTime?: Date;
  /**	Boolean	小包垃圾落地是否已处置	M */
  IsHandle!: boolean;
  /**	Boolean	是否滞留	M */
  IsTimeout!: boolean;
  /**	CameraImageUrl[]	垃圾落地的图片ID、图片地址列表	O */
  DropImageUrls?: CameraImageUrl[];
  /**	CameraImageUrl[]	垃圾处置的图片ID、图片地址列表	O */
  HandleImageUrls?: CameraImageUrl[];
  /**	CameraImageUrl[]	滞留的图片ID、图片地址列表	O */
  TimeoutImageUrls?: CameraImageUrl[];
  /**	Boolean	处置人员是否已处置	O */
  Processed?: boolean;
  /**	String	处置人员名称	O */
  ProcessorName?: string;
  /**	String	处置人员ID	O */
  ProcessorId?: string;
  /**	String	手机号码	O */
  ProcessorMobileNo?: string;
  /**	DateTime	处置时间	O */
  @Transform(transformDateTime)
  ProcessTime?: Date;
  /**	String	处置描述	O */
  ProcessDescription?: string;
  /**	String	小区ID	O */
  CommunityId?: string;
  /**	String	小区名称	O */
  CommunityName?: string;
  /**	String	工单号	O */
  RecordNo?: string;

  /**	String	滞留时间	O */
  TakeMinutes?: number;
  /**	Boolean	是否超级滞留	O */
  IsSuperTimeout?: boolean;
  /**	GisPoint	投放点GIS点位	O	*/
  GisPoint?: GisPoint;
  /**	GarbageDropSuperVisionData	督办信息	O	*/
  @Type(() => GarbageDropSuperVisionData)
  SuperVisionData?: GarbageDropSuperVisionData;
  /**	Int32	"反馈状态
0：表示没有人员反馈。
1：表示已反馈"	O	*/
  FeedbackState?: number;
  /**	DateTime	首次反馈时间	O	*/
  @Transform(transformDateTime)
  FirstFeedbackTime?: Date;
  /**	Int32	"反馈结果：
1：完成，2：误报，3：管理不规范"	O	*/
  FirstFeedbackResult?: number;
  /**	Double	反馈用时单位：秒	O	*/
  FeedbackSeconds?: number;
  /**	GarbageDropFeedback[]	督办反馈信息	O	*/
  @Type(() => GarbageDropFeedback)
  Feedbacks?: GarbageDropFeedback[];
}
