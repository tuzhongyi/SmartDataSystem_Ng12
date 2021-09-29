import { ComparisonType } from 'src/app/enum/comparison-type.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from '../../model/division-number-statistic-v2.model';
import {
  IntervalParams,
  IParams,
  PagedIntervalParams,
  PagedParams,
} from '../IParams.interface';

/**获取区划列表参数 */
export class GetDivisionsParams extends PagedParams implements IParams {
  /**区划ID(可选) */
  Ids?: string[];

  /**区划名称，支持LIKE(可选) */
  Name?: string;

  /**区划类型(可选) */
  DivisionType?: DivisionType;

  /**父ID(可选) */
  ParentId?: string;

  /**区划完整路径(可选)，含本节点，@进行分割，上级节点在前，支持LIKE */
  DivisionPath?: string;

  /**祖辈ID(可选)，返回该ID下的所有子孙区划信息 */
  AncestorId?: string;
}
export class GetDivisionVolumesParams
  extends PagedIntervalParams
  implements IParams
{
  /**
   *	Int32	统计时间单位：
   *  1-Hour，2-Day	M
   * @memberof GetDivisionVolumesParams
   */
  TimeUnit!: TimeUnit;
}
export class GetDivisionEventNumbersParams
  extends PagedIntervalParams
  implements IParams
{
  /**
   *	Int32	统计时间单位：
   *  1-Hour，2-Day	M
   * @memberof GetDivisionVolumesParams
   */
  TimeUnit!: TimeUnit;
}
export class GetDivisionStatisticNumbersParams
  extends PagedParams
  implements IParams
{
  /**	String[]	区划ID	O */
  Ids?: string[];
  /**	String	区划名称，支持LIKE	O */
  Name?: string;
}
export class GetDivisionSumEventNumberParams
  extends IntervalParams
  implements IParams
{
  /**	String[]	区划ID列表	M */
  DivisionIds!: string[];
  /**
   * 	Int32	事件类型，
   *  1：乱丢垃圾	M
   */
  EventType!: EventType;

  /**	String	排序：Asc，Desc	O */
  OrderBy?: OrderType;
  /**	Int32	返回数量	O */
  Limit?: number;
}
export class GetDivisionStatisticNumbersParamsV2
  extends IntervalParams
  implements IParams
{
  /**
   * 	Int32	统计时间单位：
   *  2-Day,3-Week,4-Month	M
   */
  TimeUnit!: TimeUnit;

  /**	String[]	区划ID列表	M */
  DivisionIds!: string[];
  /**	String[]	升序排列的属性名称	O */
  Asc?: string[];
  /**	String[]	降序排列的属性名称	O */
  Desc?: string[];
}
export class GetDivisionStatisticComparisonParams implements IParams {
  /**	Int32	比较方式，1-环比，2-同比	M */
  Comparison!: ComparisonType;
  /**	DivisionNumberStatisticV2[]	待比较数据	M */
  Data!: DivisionNumberStatisticV2[];
}
