/*
 * @Author: pmx
 * @Date: 2022-11-04 14:50:32
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-04 15:40:27
 */
import { Transform } from 'class-transformer';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehicleRelayOperator } from 'src/app/enum/vehicle-relay.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GisRoutePoint } from '../../model/gis-point.model';
import { transformDateTime } from '../../model/transform.model';
import {
  IParams,
  PagedDurationParams,
  PagedParams,
} from '../IParams.interface';

export class GetGarbageVehiclesParams extends PagedParams implements IParams {
  /**	String[]	清运车辆ID	O */
  Ids?: string[];
  /**	String	清运车辆名称，支持LIKE	O */
  Name?: string;
  /**	Int32	清运车辆类型	O */
  VehicleType?: VehicleType;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	祖辈ID，返回该ID下的所有子孙区划及其本身的垃圾房	O */
  AncestorId?: string;
  /**	Boolean	区划ID为NULL	O */
  DivisionIdNullable?: boolean;
  /**	String	IMEI串号	O */
  IMEI?: string;
  /**	Int32	车辆状态	O */
  State?: VehicleState;
  /**	String	唯一编号	O */
  No?: string;
  /**	String	车牌号码	O */
  PlateNo?: string;
}

export class GetGarbageVehicleCamerasParams
  extends PagedParams
  implements IParams {
  /**	String[]	摄像机ID	O */
  Ids?: string[];
  /**	String[]	清运车辆ID	O */
  GarbageVehicleIds?: string[];
  /**	String	摄像机名称	O */
  Name?: string;
  /**	Int32	摄像机用途	O */
  CameraUsage?: CameraUsage;
  /**	Int32	在线状态，0-正常，1-离线	O */
  OnlineStatus?: OnlineStatus;
  /**	String[]	所属区划	O */
  DivisionIds?: string[];
}

export class GetGarbageVehicleRouteParams
  extends PagedDurationParams
  implements IParams {
  /**	String	车辆ID	M */
  VehicleId!: string;
  /**	String[]	只检查包含垃圾桶ID的点位	O */
  TrashCanIds?: string[];
  /**	Boolean	是否按时间倒序排列	O */
  Desc?: keyof GisRoutePoint;
}

export class ResetRelayParams implements IParams {
  /**	Int32[]	需要操作的继电器编号数组1-8，目前设备前端最多3个继电器 ，从1开始	M */
  No!: number[];
  /**	Int32	操作：1：复位，2：打开，3：关闭	M */
  Operator!: VehicleRelayOperator;
}
