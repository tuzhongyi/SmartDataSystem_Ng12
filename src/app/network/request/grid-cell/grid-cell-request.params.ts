import { CellType } from 'src/app/enum/cell-type.enum';
import { ComparisonType } from 'src/app/enum/comparison-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GridCellNumberStatisticV2 } from '../../model/grid-cell-number-statistic-v2.model';
import {
  IntervalParams,
  IParams,
  PagedIntervalParams,
  PagedParams,
} from '../IParams.interface';

export class GetGridCellsParams extends PagedParams implements IParams {
  /**	String[]	网格单元ID	O */
  Ids?: string[];
  /**	String	网格单元名称，支持LIKE	O */
  Name?: string;
  /**	Int32	网格单元类型	O */
  CellType?: CellType;
  /**	String	父ID	O */
  ParentId?: string;
  /**	String	祖辈ID，返回该ID下的所有子孙网格单元信息	O */
  AncestorId?: string;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
}

export class GetGridCellEventNumbersParams
  extends PagedIntervalParams
  implements IParams
{
  /**
   * 	Int32	统计时间单位：
   *  1-Hour，2-Day	M
   */
  TimeUnit!: TimeUnit;
}
export class GetGridCellStatisticNumbersParams
  extends PagedParams
  implements IParams
{
  /**	String[]	网格ID	O */
  Ids?: string[];
  /**	String	网格名称，支持LIKE	O */
  Name?: string;
}
export class GetGridCellStatisticComparisonParams implements IParams {
  /**	Int32	比较方式，1-环比，2-同比	M */
  Comparison!: ComparisonType;
  /**	GridCellNumberStatisticV2[]	待比较数据	M */
  Data!: GridCellNumberStatisticV2[];
}
export class GetGridCellStatisticNumbersParamsV2
  extends IntervalParams
  implements IParams
{
  /**
   * 	Int32	统计时间单位：
   *  2-Day,3-Week,4-Month	M
   */
  TimeUnit!: TimeUnit;

  /**	String[]	网格单元ID列表	M */
  GridCellIds!: string[];
  /**	String[]	升序排列的属性名称	O */
  Asc?: string[];
  /**	String[]	降序排列的属性名称	O */
  Desc?: string[];
}
