import { EventType } from 'src/app/enum/event-type.enum';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { CollectionScoreEnum } from 'src/app/enum/collection-score.enum';
import { CompareRange } from '../../model/compare-range.model';
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
}

export class GetGarbageDropEventRecordsParams
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
  /**	Boolean	是否已处置	O */
  IsHandle?: boolean;
  /**	Boolean	是否已滞留	O */
  IsTimeout?: boolean;
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
}
