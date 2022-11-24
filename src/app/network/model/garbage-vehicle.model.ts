import { Transform, Type } from 'class-transformer';
import { RelayState } from 'src/app/enum/relay-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GisPoint } from './gis-point.model';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
import { VehicleCamera } from './vehicle-camera.model';
/**	清运车辆	*/
export class GarbageVehicle implements IModel {
  /**	String	车辆ID	M	*/
  Id!: string;
  /**	String	车辆名称	M	*/
  Name!: string;
  /**	Int32	"车辆类型：
1：三轮车
2：汽车"	M	*/
  VehicleType!: VehicleType;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	GisPoint	当前位置GIS点位	O	*/
  GisPoint?: GisPoint;
  /**	String	所属区划ID	O	*/
  DivisionId?: string;
  /**	Camera[]	摄像机列表	O	*/
  @Type(() => VehicleCamera)
  Cameras?: VehicleCamera[];
  /**	String	IMEI串号	O	*/
  IMEI?: string;
  /**	String	唯一编号	M	*/
  No!: string;
  /**	Int32	状态	O	*/
  State?: VehicleState;
  /**	Int32	心跳间隔，单位：秒，默认5秒	O	*/
  HeartbeatInterval?: number;
  /**	Int32	自动关闭时间，最小600，最大14400	O	*/
  ShutdownSeconds?: number;
  /**	Int32	继电器数量	O	*/
  RelayCount?: number;
  /**	Int32	"继电器状态，0-关闭，1-打开，最低位，表示1号继电器"	O	*/
  RelayState?: RelayState;
  /**	String	车牌号码	O	*/
  PlateNo?: string;

  static Create() {
    let model = new GarbageVehicle();
    model.CreateTime = new Date();
    model.UpdateTime = new Date();
    model.VehicleType = VehicleType.Tricycle;
    model.No = '10000';
    model.HeartbeatInterval = 5;
    model.ShutdownSeconds = 600;
    return model;
  }
}
