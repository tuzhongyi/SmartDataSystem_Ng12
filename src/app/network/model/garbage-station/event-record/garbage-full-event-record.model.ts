import { Transform } from 'class-transformer';
import { transformDateTime } from '../../transform.model';
import { CameraImageUrl } from '../../url.model';
import { EventRecordData } from './garbage-event-record.model';

/**
 * 垃圾满溢事件
 * Data	GarbageFullEventData	事件数据	M
 *
 * */
export class GarbageFullEventRecord extends EventRecordData<GarbageFullEventData> {}

export class GarbageFullEventData {
  /**	String	垃圾房ID	M */
  StationId!: string;
  /**	String	垃圾房名称	M */
  StationName!: string;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	区划名称	O */
  DivisionName?: string;
  /**	DateTime	第一次满溢时间	M */
  @Transform(transformDateTime)
  FullTime!: Date;
  /**	String[]	图片ID、图片地址列表	O */
  ImageUrls?: string[];
  /**	CameraImageUrl[]	图片ID、图片地址列表	O */
  CameraImageUrls?: CameraImageUrl[];
  /**	String	网格单元ID	O */
  GridCellId?: string;
  /**	String	网格单元名称	O */
  GridCellName?: string;
}
