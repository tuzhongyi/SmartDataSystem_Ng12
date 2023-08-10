import { Transform, Type } from 'class-transformer';
import { IIdModel } from '../model.interface';

import { PagedList } from '../page_list.model';
import { transformDateTime } from '../transform.model';

export class AIGarbageRfidCard implements IIdModel {
  Id!: string;
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
  /**	DateTime	变更时间	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
}
export class PagedListAIGarbageRfidCard extends PagedList<AIGarbageRfidCard> {
  @Type(() => AIGarbageRfidCard)
  Data!: AIGarbageRfidCard[];
}
