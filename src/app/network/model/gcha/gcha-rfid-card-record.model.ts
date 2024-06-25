import { Transform } from 'class-transformer';
import { IIdModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	RfidCardRecord (Rfid刷卡记录)	*/
export class GCHARfidCardRecord implements IIdModel {
  /**	String	RFID卡唯一ID, 整数字符串	M	*/
  Id!: string;
  /**	DateTime	刷卡时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	Double	干垃圾重量，单位：KG	O	*/
  DryWeight?: number;
  /**	Double	湿垃圾重量，单位：KG	O	*/
  WetWeight?: number;
}
