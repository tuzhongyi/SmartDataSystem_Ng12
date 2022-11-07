import { Transform } from 'class-transformer';
import { Gender } from 'src/app/enum/gender.enum';
import { MemberType, VehicleMemberType } from '../../enum/member-type.enum';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** 垃圾房管理人员 */
export class Member implements IModel {
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

/**	垃圾房清运人员	*/
export class VehicleMember implements IModel {
  /**	String	成员ID	M	*/
  Id!: string;
  /**	String	姓名	M	*/
  Name!: string;
  /**	Int32	性别，1-男性，2-女性	O	*/
  Gender?: Gender;
  /**	String	手机号码	O	*/
  MobileNo?: string;
  /**	String	描述信息	O	*/
  Note?: string;
  /**	Int32	人员类型	M	*/
  MemberType!: VehicleMemberType;
  /**	String	微信OpenId	O	*/
  WeChatOpenId?: string;
  /**	String	所属区划ID	O	*/
  DivisionId?: string;
  /**	String	唯一编号	M	*/
  No!: string;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
