import { EventType } from 'src/app/enum/event-type.enum';
import {
  IParams,
  PagedIntervalParams,
  PagedParams,
} from '../IParams.interface';

export class GetEventInfosParams extends PagedParams implements IParams {
  /**	Int32[]	事件类型	O */
  Types?: EventType[];
  /**	String	事件名称，支持LIKE	O */
  Name?: string;
}

export class GetEventRecordsParams
  extends PagedIntervalParams
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
}
