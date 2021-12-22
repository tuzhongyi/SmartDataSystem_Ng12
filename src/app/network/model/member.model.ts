import { Transform } from 'class-transformer';
import { MemberType } from '../../enum/member-type.enum';
import { transformDateTime } from './transform.model';

/** 垃圾房管理人员 */
export class Member {
  /**	String	成员ID	M */
  Id!: string;
  /**	String	姓名	M */
  Name!: string;
  /**	Int32	性别，1-男性，2-女性	O */
  Gender?: number;
  /**	String	手机号码	O */
  MobileNo?: string;
  /**	String	描述信息	O */
  Note?: string;
  /**	Int32	人员类型	M */
  MemberType!: MemberType;
  /**	String	微信OpenId	O */
  WeChatOpenId?: string;
  /**	String	所属区划ID	O */
  DivisionId?: string;
  /**	String	所属网格ID 	O */
  GridCellId?: string;
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
