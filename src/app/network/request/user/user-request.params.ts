import { Gender } from 'src/app/enum/gender.enum';
import { UserLabelType } from 'src/app/enum/user-label-type.enum';
import { UserState } from 'src/app/enum/user-state.enum';
import { IParams, PagedParams } from '../IParams.interface';

export class GetUsersParams extends PagedParams implements IParams {
  /**	String[]	用户ID	O */
  Ids?: string[];
  /**	String	用户名称，支持LIKE	O */
  Name?: string;
  /**	Int32	性别	O */
  Gender?: Gender;
  /**	String	手机号码，支持LIKE	O */
  MobileNo?: string;
  /**	String	邮箱，支持LIKE	O */
  Email?: string;
  /**	Int32	0-正常	O */
  State?: UserState;
  /**	String	用户角色	O */
  RoleId?: string;
}

export class GetUserLabelsParams extends PagedParams implements IParams {
  /**	String[]	标签ID	O */
  LabelIds?: string[];
  /**	String	标签名称，支持LIKE	O */
  LabelName?: string;
  /**	Int32	标签类型	O */
  LabelType?: UserLabelType;
  /**	String	标签内容，支持LIKE	O */
  Content?: string;
}

export class RandomUserPaswordParams implements IParams {
  /**	Int32	有效日期数量[1-365]	M */
  Days!: number;
}

export class ChangeUserPasswordParams implements IParams {
  /**	String	密码	M */
  Password!: string;
}
