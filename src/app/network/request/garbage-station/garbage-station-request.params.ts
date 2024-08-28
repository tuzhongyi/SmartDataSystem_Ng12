import { Transform } from 'class-transformer';
import { CameraClassification } from 'src/app/enum/camera-classification.enum';
import { CameraEncodeType } from 'src/app/enum/camera-type.enum';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { ComparisonType } from 'src/app/enum/comparison-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { LidState } from 'src/app/enum/lid-state.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { GarbageStationNumberStatisticV2 } from '../../model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStation } from '../../model/garbage-station/garbage-station.model';
import { transformDate } from '../../model/transform.model';
import {
  DurationParams,
  IParams,
  PagedDurationParams,
  PagedParams,
} from '../IParams.interface';

/**获取垃圾房列表参数 */
export class GetGarbageStationsParams extends PagedParams implements IParams {
  /**垃圾房ID(可选) */
  Ids?: string[];
  /**垃圾房名称(可选)，支持LIKE */
  Name?: string;
  /**垃圾房类型(可选) */
  StationType?: number;
  /**区划ID(可选) */
  DivisionId?: string;
  /**干垃圾是否满溢(可选) */
  DryFull?: boolean;
  /**湿垃圾是否满溢(可选) */
  WetFull?: boolean;
  /**祖辈ID(可选)，返回该ID下的所有子孙区划及其本身的垃圾房 */
  AncestorId?: string;
  /**小区名称，支持LIKE */
  CommunityName?: string;
  /**	Int32	垃圾房状态,FLAGS	O */
  StationState?: number;
  /**	String	IMEI串号	O */
  IMEI?: string;
  /**	String	小区ID	O */
  CommunityId?: string;
  /**
   * Int64	厢房能力，
   * 1：GCHA（智能主机）
   * 2：DOOR（感应门）
   * O
   **/
  Capabilities?: number;
  /**	String	前端设备接入ID	O */
  DeviceAccessId?: string;
  /**
   * 	Int32
   * 	NB状态
   *  0：正常
   *  1：故障
   *  2：220V故障
   * 	O
   */
  NBState?: number;
  /**	Int32	NB心跳超时时长，单位：小时	O */
  NBHours?: number;
  /**	Int32	GCHA在线状态 0:正常、1:异常	O */
  GCHAOnlineStatus?: number;
  /**	Int32	设备在线状态 0:正常、1:异常 GarbageDeviceData	O */
  DeviceOnlineStatus?: number;
}

export class GetGarbageStationCamerasParams
  extends PagedParams
  implements IParams
{
  /**	String[]	摄像机ID	O */
  Ids?: string[];
  /**	String[]	垃圾房ID	O */
  GarbageStationIds?: string[];
  /**	String	摄像机名称	O */
  Name?: string;
  /**	Int32	摄像机用途	O */
  CameraUsage?: CameraUsage;
  /**	Int32	在线状态，0-正常，1-离线	O */
  OnlineStatus?: OnlineStatus;
  /**	String[]	所属区划	O */
  DivisionIds?: string[];
  /**	String[]	所属网格	O */
  GridCellIds?: string[];
  /**	String[]	所属小区	O */
  CommunityIds?: string[];
  /**	String	摄像机类型，G3、G5、TD	O */
  CameraType?: CameraEncodeType;
  /**
   * 	Int32
   * 	摄像机分类
   *  0：普通摄像机
   *  1：热成像摄像机
   * 	O
   */
  Classification?: CameraClassification;

  /**	String	编码设备ID	O */
  EncodeDeviceId?: string;
  /**	Int32	场景变换：0-正常，1-稍微偏移，2-严重偏移	O */
  SceneChange?: number;
  /**	Int32	清晰度：0-正常，1-轻微模糊，2-严重模糊	O */
  ImageQuality?: number;
  /**	Int32	视频亮度：0-很暗，1-稍暗 ，2-正常，3-稍亮，4-很亮	O */
  Brightness?: number;
  /**	Int32	色差/偏色 0-正常，1-轻微偏色，2-严重偏色	O */
  Aberration?: number;
  /**	Int32	视频干扰，0-正常，1-条纹干扰	O */
  Disturbance?: number;
  /**	Int32	录像状态：0-正常，1-故障(暂时无效)	O */
  RecordState?: number;
}

export class GetGarbageStationTrashCansParams
  extends PagedParams
  implements IParams
{
  /**	String	垃圾桶ID	O */
  Ids?: string;
  /**	String[]	摄像机ID	O */
  CameraIds?: string[];
  /**	String[]	垃圾房ID	O */
  GarbageStationIds?: string[];
  /**	String	垃圾桶名称	O */
  Name?: string;
  /**	String	垃圾桶编号	O */
  No?: string;
  /**	Int32	垃圾桶类型	O */
  CanType?: TrashCanType;
  /**
   * Int32	垃圾桶盖子状态：
   *  0：打开，1：关闭	O
   */
  LidState?: LidState;
}
export class GetGarbageStationVolumesParams
  extends PagedDurationParams
  implements IParams
{
  /**
   * 	Int32	统计时间单位：
   *  1-Hour，2-Day	M
   */
  TimeUnit!: TimeUnit;
}
export class GetGarbageStationEventNumbersParams
  extends PagedDurationParams
  implements IParams
{
  /**
   * 	Int32	统计时间单位：
   *  1-Hour，2-Day	M
   */
  TimeUnit!: TimeUnit;
}
export class GetGarbageStationStatisticNumbersParams
  extends PagedParams
  implements IParams
{
  /**	String[]	垃圾房ID	O */
  Ids?: string[];
  /**	String	垃圾房名称，支持LIKE	O */
  Name?: string;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	网格ID	O */
  GridCellId?: string;
  /**	Boolean	当前有没有垃圾落地	O */
  GarbageDrop?: boolean;
  /**	String	小区ID	O */
  CommunityId?: string;
  /**	String	小区名称，支持LIKE	O */
  CommunityName?: string;
}
export class GetGarbageStationStatisticGarbageCountsParams implements IParams {
  /**	Date	日期	M */
  @Transform(transformDate)
  Date!: Date;
  /**	String[]	垃圾房ID列表	M */
  GarbageStationIds!: string[];
}
export class GetGarbageStationSumEventNumberParams
  extends DurationParams
  implements IParams
{
  /**	String[]	垃圾房ID列表	M */
  GarbageStationIds!: string[];
  /**
   *	Int32	事件类型，
   *  1：乱丢垃圾
   *  2：混合投放	M
   */
  EventType!: EventType;
  /**	String	排序：Asc，Desc	O */
  OrderBy?: OrderType;
  /**	Int32	返回数量	O */
  Limit?: number;
}

export class CameraDownloadFileParams extends DurationParams {
  GarbageStationId!: string;
  CameraId!: string;
}
export class CameraUploadFileParams extends DurationParams {
  GarbageStationId!: string;
  CameraId!: string;
}
/**
 *  注意时间段，如果超出统计单元时间，则同一ID会有多个不同时段的结果。
 *  如果需要统计某个ID的一年内每个月的数据，时间段可以设置成全年，结果会返回1-12月共12个结果
 *
 * @export
 * @class GetGarbageStationStatisticNumbersParamsV2
 * @extends {DurationParams}
 */
export class GetGarbageStationStatisticNumbersParamsV2
  extends DurationParams
  implements IParams
{
  /**	String[]	垃圾房ID列表	M */
  GarbageStationIds!: string[];
  /**
   *	Int32	统计时间单位：
   *  2-Day,3-Week,4-Month	M
   * @memberof GetGarbageStationStatisticNumbersParamsV2
   */
  TimeUnit!: TimeUnit;

  /**	String[]	升序排列的属性名称	O */
  Asc?: keyof GarbageStation[];
  /**	String[]	降序排列的属性名称	O */
  Desc?: keyof GarbageStation[];
}

export class GetGarbageStationStatisticComparisonParams implements IParams {
  /**	Int32	比较方式，1-环比，2-同比	M */
  Comparison!: ComparisonType;
  /**	GarbageStationNumberStatisticV2[]	待比较数据	M */
  Data!: GarbageStationNumberStatisticV2[];
}
export class FinishTaskParams implements IParams {
  /**	String	处置描述	O */
  FinishDescription!: string;
}
