import { Data } from '@angular/router';
import { Transform } from 'class-transformer';
import { CameraUsage } from 'src/app/enum/camera-sage.enum';
import { CanType } from 'src/app/enum/can-type.enum';
import { ComparisonType } from 'src/app/enum/comparison-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { LidState } from 'src/app/enum/lid-state.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationNumberStatisticV2 } from '../../model/garbage-station-number-statistic-v2.model';
import { transformDate, transformDateTime } from '../../model/transform.model';
import {
  IntervalParams,
  IParams,
  PagedIntervalParams,
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
  CanType?: CanType;
  /**
   * Int32	垃圾桶盖子状态：
   *  0：打开，1：关闭	O
   */
  LidState?: LidState;
}
export class GetGarbageStationVolumesParams
  extends PagedIntervalParams
  implements IParams
{
  /**
   * 	Int32	统计时间单位：
   *  1-Hour，2-Day	M
   */
  TimeUnit!: TimeUnit;
}
export class GetGarbageStationEventNumbersParams
  extends PagedIntervalParams
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
}
export class GetGarbageStationStatisticGarbageCountsParams implements IParams {
  /**	Date	日期	M */
  @Transform(transformDate)
  Date!: Date;
  /**	String[]	垃圾房ID列表	M */
  GarbageStationIds!: string[];
}
export class GetGarbageStationSumEventNumberParams
  extends IntervalParams
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

export class CameraDownloadFileParams extends IntervalParams {
  GarbageStationId!: string;
  CameraId!: string;
}
export class CameraUploadFileParams extends IntervalParams {
  GarbageStationId!: string;
  CameraId!: string;
}
/**
 *  注意时间段，如果超出统计单元时间，则同一ID会有多个不同时段的结果。
 *  如果需要统计某个ID的一年内每个月的数据，时间段可以设置成全年，结果会返回1-12月共12个结果
 *
 * @export
 * @class GetGarbageStationStatisticNumbersParamsV2
 * @extends {IntervalParams}
 */
export class GetGarbageStationStatisticNumbersParamsV2
  extends IntervalParams
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
  Asc?: string[];
  /**	String[]	降序排列的属性名称	O */
  Desc?: string[];
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
