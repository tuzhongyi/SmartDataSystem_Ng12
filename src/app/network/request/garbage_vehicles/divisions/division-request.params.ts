import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { DivisionGarbageWeight } from 'src/app/network/model/division-garbage-weight.model';
import { PagedParams, IParams, DurationParams } from '../../IParams.interface';

/**获取区划列表参数 */
export class GetDivisionsParams extends PagedParams implements IParams {
  /**区划ID(可选) */
  Ids?: string[];

  /**区划名称，支持LIKE(可选) */
  Name?: string;

  /**区划类型(可选) */
  DivisionType?: DivisionType;

  /**
   * 父ID(可选)
   * 获取直接子元素
   */
  ParentId?: string;

  /**区划完整路径(可选)，含本节点，@进行分割，上级节点在前，支持LIKE */
  DivisionPath?: string;

  /**祖辈ID(可选)，返回该ID下的所有子孙区划信息 */
  AncestorId?: string;
}

export class GetDivisionGarbageWeightsParams
  extends DurationParams
  implements IParams
{
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	String	区划名称，支持LIKE	O */
  DivisionName?: string;
  /**	Int32	统计时间单位：2-Day,3-Week,4-Month	O */
  TimeUnit?: TimeUnit;
  /**	String	排序，字段名称	O */
  Asc?: keyof DivisionGarbageWeight;
  /**	String	倒序，字段名称	O */
  Desc?: keyof DivisionGarbageWeight;
}

export class GetDivisionGarbageScoresParams
  extends DurationParams
  implements IParams
{
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	String	区划名称，支持LIKE	O */
  DivisionName?: string;
  /**	Int32	统计时间单位：2-Day,3-Week,4-Month	O */
  TimeUnit?: TimeUnit;
  /**	String	排序，字段名称	O */
  Asc?: keyof DivisionGarbageScore;
  /**	String	倒序，字段名称	O */
  Desc?: keyof DivisionGarbageScore;
}
