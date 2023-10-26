import { Transform } from 'class-transformer';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { ICamera } from './camera.interface';
import { GisPoint } from './gis-point.model';
/**	摄像机	*/
export class VehicleCamera implements ICamera, IModel {
  /**	String	摄像机ID	M	*/
  Id!: string;
  /**	String	摄像机名称	M	*/
  Name!: string;
  /**	Int32	摄像机用途	M	*/
  CameraUsage!: CameraUsage;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	String	清运车辆ID	M	*/
  GarbageVehicleId!: string;
  /**	Int32	位置编号，
  /**	  1：车头
  /**	  2：车尾
  /**	  3：垃圾桶	O	*/
  PositionNo?: VehiclePositionNo;
  /**	Int32	在线状态0-正常，1-离线	O	*/
  OnlineStatus?: OnlineStatus;
  /**	String	照片URL或ID	O	*/
  ImageUrl?: string;
  /**	DateTime	照片时间	O	*/
  @Transform(transformDateTime)
  ImageTime?: Date;
  /**	GisPoint	当前位置GIS点位	O	*/
  GisPoint?: GisPoint;
}
