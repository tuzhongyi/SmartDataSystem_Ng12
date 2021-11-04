import { Transform } from 'class-transformer';
import { CanType } from '../../enum/can_type.enum';
import { LidState } from '../../enum/lid_state.enum';
import { transformDate } from './transform.model';

/** 垃圾桶 */
export class TrashCan {
  /**	String	垃圾桶ID	M */
  Id!: string;
  /**	String	垃圾桶名称	O */
  Name?: string;
  /**	String	垃圾桶编号	O */
  No?: string;
  /**	Int32	垃圾桶类型	M */
  CanType!: CanType;
  /**	Double	容积，单位：L，默认：240	M */
  MaxVolume!: number;
  /**	Double	当前容积，单位：L	O */
  CurrentVolume?: number;
  /**	DateTime	创建时间	M */
  @Transform(transformDate)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDate)
  UpdateTime!: Date;
  /**	String	垃圾桶房	M */
  GarbageStationId!: string;
  /**	String	摄像机ID	O */
  CameraId?: string;
  /**	Int32	垃圾桶盖子状态：0：打开，1：关闭	O */
  LidState?: LidState;
}
