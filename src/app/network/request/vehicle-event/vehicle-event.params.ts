/*
 * @Author: pmx
 * @Date: 2022-11-06 14:50:26
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 15:05:54
 */
import { Transform } from 'class-transformer';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { CollectionPointScore } from 'src/app/enum/vehicle-score.enum';
import { CompareRange } from '../../model/compare-range.model';
import { transformDateTime } from '../../model/transform.model';
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

export class GetGarbageCollectionEventRecordsParams
  extends PagedDurationParams
  implements IParams
{
  /**	String[]	所属区划ID列表	O */
  DivisionIds?: string[];
  /**	String[]	车辆ID列表	O */
  VehicleIds?: string[];
  /**	String	车辆名称，支持LIKE	O */
  VehicleName?: string;
  /**	String[]	资源ID列表	O */
  ResourceIds?: string[];
  /**	String	资源名称，支持LIKE	O */
  ResourceName?: string;
  /**	String[]	清运人员ID	O */
  MemberIds?: string[];
  /**	String	清运人员姓名，支持LIKE	O */
  MemberName?: string;
  /**	String[]	垃圾桶ID	O */
  TrashCanIds?: string[];
  /**	String	垃圾桶名称，支持LIKE	O */
  TrashCanName?: string[];
  /**	Int32	垃圾桶类型	O */
  TrashCanType?: TrashCanType;
  /**	String	地址，支持LIKE	O */
  Address?: string;
  /**	Int32	分类评分：1-差评，2-中评，3-好评	O */
  Score?: CollectionPointScore;
  /**	String[]	垃圾收运点ID	O */
  CollectionPointIds?: string[];
  /**	String	垃圾收运点名称	O */
  CollectionPointName?: string[];
  /**	Boolean	是否倒序时间排列	O */
  Desc?: boolean;
}

export class GetRelayStateChangeEventRecordsParams
  extends PagedDurationParams
  implements IParams
{
  /**	String[]	所属区划ID列表	O	*/
  DivisionIds?: string[];
  /**	String[]	车辆ID列表	O	*/
  VehicleIds?: string[];
  /**	String	车辆名称，支持LIKE	O	*/
  VehicleName?: string;
  /**	String[]	资源ID列表	O	*/
  ResourceIds?: string[];
  /**	String	资源名称，支持LIKE	O	*/
  ResourceName?: string;
  /**	Boolean	是否倒序时间排列	O	*/
  Desc?: boolean;
}

export class GetVehicleOnlineEventRecordsParams
  extends PagedDurationParams
  implements IParams
{
  /**	String[]	所属区划ID列表	O	*/
  DivisionIds?: string[];
  /**	String[]	车辆ID列表	O	*/
  VehicleIds?: string[];
  /**	String	车辆名称，支持LIKE	O	*/
  VehicleName?: string;
  /**	String[]	资源ID列表	O	*/
  ResourceIds?: string[];
  /**	String	资源名称，支持LIKE	O	*/
  ResourceName?: string;
  /**	Int32	在线状态0-正常，1-离线	O	*/
  OnlineStatus?: OnlineStatus;
  /**	Boolean	是否倒序时间排列	O	*/
  Desc?: boolean;
}

export class GetCameraOnlineEventRecordsParams
  extends PagedDurationParams
  implements IParams
{
  /**	String[]	所属区划ID列表	O	*/
  DivisionIds?: string[];
  /**	String[]	车辆ID列表	O	*/
  VehicleIds?: string[];
  /**	String	车辆名称，支持LIKE	O	*/
  VehicleName?: string;
  /**	String[]	资源ID列表	O	*/
  ResourceIds?: string[];
  /**	String	资源名称，支持LIKE	O	*/
  ResourceName?: string;
  /**	String[]	摄像机ID列表	O	*/
  CameraIds?: string[];
  /**	String	摄像机名称，支持LIKE	O	*/
  CameraName?: string;
  /**	Int32	在线状态0-正常，1-离线	O	*/
  OnlineStatus?: OnlineStatus;
  /**	Boolean	是否倒序时间排列	O	*/
  Desc?: boolean;
}
