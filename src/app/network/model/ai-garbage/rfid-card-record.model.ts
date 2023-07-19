import { Transform, Type } from 'class-transformer';
import { IdModel } from '../model.model';
import { PagedList } from '../page_list.model';
import { transformDateTime } from '../transform.model';

export class AIGarbageRfidCardRecord extends IdModel {
  /**	Int64	RFID卡唯一ID	M	*/
  CardId!: number;
  /**	DateTime	刷卡时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	String	设备名称	O	*/
  DeviceName?: string;
  /**	String	垃圾厢房ID	O	*/
  GarbageStationId?: string;
  /**	String	垃圾厢房名称	O	*/
  GarbageStationName?: string;
  /**	String	所属区域ID	O	*/
  RegionId?: string;
  /**	String	所属区域名称	O	*/
  RegionName?: string;
  /**	String	楼栋编号 15号	O	*/
  BuildingNo?: string;
  /**	String	房屋编号 302室	O	*/
  RoomNo?: string;
  /**	String	持卡人	O	*/
  CardHolder?: string;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
  /**	Double	干垃圾重量，单位：KG	O */
  DryWeight?: number;
  /**	Double	湿垃圾重量，单位：KG	O */
  WetWeight?: number;
}
export class PagedListAIGarbageRfidCardRecord extends PagedList<AIGarbageRfidCardRecord> {
  @Type(() => AIGarbageRfidCardRecord)
  Data!: AIGarbageRfidCardRecord[];
}
