import { MemberType } from 'src/app/enum/member_type.enum';
import { IParams, PagedParams } from '../IParams.interface';

export class GetMembersParams extends PagedParams implements IParams {
  /**	String[]	人员ID	O */
  Ids?: string[];
  /**	String	人员名称，支持LIKE	O */
  Name?: string;
  /**	String	手机号码，支持LIKE	O */
  MobileNo?: string;
  /**	Int32	人员类型	O */
  MemberType?: MemberType;
  /**	String	区划ID	O */
  DivisionId?: string;
  /**	String	网格单元ID	O */
  GridCellId?: string;
  /**	String	管理的厢房ID	O */
  GarbageStationId?: string;
}
