import { CollectionMemberType } from 'src/app/enum/member-type.enum';
import { IParams, PagedParams } from '../../IParams.interface';

export class GetCollectionMembersParams extends PagedParams implements IParams {
  /**	String[]	人员ID	O	*/
  Ids?: string[];
  /**	String	人员名称，支持LIKE	O	*/
  Name?: string;
  /**	String	手机号码，支持LIKE	O	*/
  MobileNo?: string;
  /**	Int32	人员类型	O	*/
  MemberType?: CollectionMemberType;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	唯一编号	O	*/
  No?: string;
}
