import { Transform } from 'class-transformer';
import { TrashCanType } from '../../enum/trashcan-type.enum';
import { LidState } from '../../enum/lid-state.enum';
import { GisPoint } from './gis-point.model';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** 垃圾桶 */
export class TrashCan implements IModel {
  /**	String	垃圾桶ID	M */
  Id!: string;
  /**	String	垃圾桶名称	O */
  Name?: string;
  /**	String	垃圾桶编号	O */
  No?: string;
  /**	Int32	垃圾桶类型	M */
  CanType!: TrashCanType;
  /**	Double	容积，单位：L，默认：240	M */
  MaxVolume!: number;
  /**	Double	当前容积，单位：L	O */
  CurrentVolume?: number;
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	String	垃圾桶房	M */
  GarbageStationId!: string;
  /**	String	摄像机ID	O */
  CameraId?: string;
  /**	Int32	垃圾桶盖子状态：0：打开，1：关闭	O */
  LidState?: LidState;
}

/**	垃圾桶	*/
export class CollectionTrashCan implements IModel {
  /**	String	垃圾桶ID	M	*/
  Id!: string;
  /**	String	垃圾桶名称	O	*/
  Name?: string;
  /**	String	垃圾桶编号，RFID编号	M	*/
  No!: string;
  /**	Int32	垃圾桶类型	O	*/
  CanType?: number;
  /**	Double	容积，单位：L，默认：240	O	*/
  MaxVolume?: number;
  /**	String	垃圾桶地址	O	*/
  Address?: string;
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
  /**	String	收运点ID	O	*/
  CollectionPointId?: string;
}
