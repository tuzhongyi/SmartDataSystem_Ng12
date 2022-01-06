import { Transform, Type } from 'class-transformer';
import { CameraUsage } from '../../enum/camera-sage.enum';
import { CanType } from '../../enum/can-type.enum';
import { Camera } from './camera.model';
import { GisPoint } from './gis-point.model';
import { Member } from './member.model';
import { TimeRange } from './time-range.model';
import { transformDateTime } from './transform.model';
import { TrashCan } from './trash-can.model';
import 'reflect-metadata';

/** 垃圾房、投放点 */
export class GarbageStation {
  /**	String	垃圾房ID	M */
  Id!: string;
  /**	String	垃圾房名称	M */
  Name!: string;
  /**	Int32	垃圾房类型	M */
  StationType!: number;
  /**	String	描述信息	O */
  Description?: string;
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	GisPoint	GIS点位	O */
  GisPoint?: GisPoint;
  /**	String	所属区划ID	O */
  DivisionId?: string;
  /**	TrashCan[]	垃圾桶列表	O */
  TrashCans?: TrashCan[];
  /**	Camera[]	摄像机列表	O */
  @Type(() => Camera)
  Cameras?: Camera[];
  /**	Boolean	干垃圾满溢	O */
  DryFull?: boolean;
  /**	DateTime	干垃圾满溢时间	O */
  @Transform(transformDateTime)
  DryFullTime?: Date;
  /**	Double	干垃圾容积，单位：L	O */
  DryVolume?: number;
  /**	Double	最大干垃圾容积，单位：L	M */
  MaxDryVolume!: number;
  /**	Boolean	湿垃圾满溢	O */
  WetFull?: boolean;
  /**	DateTime	湿垃圾满溢时间	O */
  @Transform(transformDateTime)
  WetFullTime?: Date;
  /**	Double	湿垃圾容积，单位：L	O */
  WetVolume?: number;
  /**	Double	最大湿垃圾容积，单位：L	M */
  MaxWetVolume!: number;
  /**	Int32	垃圾房状态	M */
  StationState!: number;
  /**	Int32	评级	O */
  Grade?: number;
  /**	TimeRange[]	计数时间段	O */
  CountSchedule?: TimeRange[];
  /**	String	地址	O */
  Address?: string;
  /**	Int32	垃圾投放点类型	O */
  DumpPointType?: number;
  /**	Int32[]	停用的事件号列表	O */
  DisableEventTypes?: number;
  /**	String	所属网格单元ID	O */
  GridCellId?: string;
  /**	GarbageParameters	垃圾相关参数	O */
  GarbageParameters?: GarbageParameters;
  /**	Member[]	人员列表	O */
  Members?: Member[];
  /**	String	IMEI串号	O */
  IMEI?: string;
}

/** 垃圾相关参数 */
export interface GarbageParameters {
  /**	Int32	处置超时时长，单位：分钟，默认：15分钟	O */
  HandleTimeout?: number;
  /** */
}

/** 垃圾房类型 */
export class GarbageStationType {
  /**	Int32	垃圾房类型，从1开始 需要服务器分配Type时，请填0	M */
  Type!: number;
  /**	String	类型名称	M */
  Name!: string;
  /**	String	描述信息	O */
  Description?: string;
  /**	GarbageStationWindow[]	垃圾投放窗口列表	O */
  Windows?: GarbageStationWindow[];
  /**	CameraSlot[]	摄像机插槽列表	O */
  CameraSlots?: CameraSlot[];
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
/** 垃圾投放窗口 */
export interface GarbageStationWindow {
  /**	Int32	窗口编号，从1开始	M */
  No: number;
  /**	String	名称	O */
  Name?: string;
  /**	Int32	垃圾桶类型	M */
  CanType: CanType;
  /**	Int32	垃圾桶数量，（保留）	O */
  TrashCanNumber?: number;
}
/** 摄像机槽位信息 */
export interface CameraSlot {
  /**	Int32	槽位编号，从1开始	M */
  No: number;
  /**	String	名称	O */
  Name?: string;
  /**	Int32	摄像机用途	M */
  CameraUsage: CameraUsage;
  /**
   * 	Int32	位置编号，
   *  箱外：1-9
   *  箱内：11-19
   *  11,15：干垃圾
   *  12：湿垃圾
   *  13：可回收垃圾
   *  14：有害垃圾	O
   */
  PositionNo?: number;

  /**	Boolean	是否厢房内部	O */
  Inside?: boolean;
  /**	Int32[]	关联的投放窗口编号	O */
  Windows?: number[];
}
