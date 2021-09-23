import { PictureDataRole } from 'src/app/enum/role-picture-data.enum';
import { PrivacyDataRole } from 'src/app/enum/role-privacy-data.enum';
import { StaticDataRole } from 'src/app/enum/role-static-data.enum';
import { UserDataRole } from 'src/app/enum/role-user-data.enum';
import { UserResourceRole } from './user.model';

/**
 *  用户认证结果
 *
 * @export
 * @class UserValidateResult
 */
export class UserValidateResult {
  /**	Boolean	随机数过期	O	R */
  NonceExpired?: boolean;
  /**	Boolean	方法是否有效	O	R */
  MethodValidated?: boolean;
  /**	UserNonce	用户信息	O	R */
  UserNonce?: UserNonce;
}

/**
 *  用户随机数信息
 *
 * @class UserNonce
 */
export class UserNonce {
  /**	String	随机数	M	R */
  Nonce!: string;
  /**	String	用户唯一标识符	O	R */
  UserId?: string;
  /**	String	用户名	O	R */
  Username?: string;
  /**	DateTime	创建时间	M	R */
  CreateTime!: Date;
  /**	DateTime	更新时间	M	R */
  UpdateTime!: Date;
  /**	String	密码	O	R */
  Password?: string;
  /**
   *  Int32	隐私数据显示
   *  4-不显示|部分显示，1-显示
   *  隐私数据包括：姓名，证件号，车牌号等。  M
   */
  PrivacyData!: PrivacyDataRole;

  /**
   * 	Int32	用户数据操作权限
   *  0-不允许，1-允许	M	R
   */
  UserData!: UserDataRole;

  /**
   * 	Int32	静态数据操作权限
   *  1-不允许，1-允许
   *  包括：小区所有的静态信息	M	R
   */
  StaticData!: StaticDataRole;

  /**
   * 	Int32	照片显示
   *  0-不显示，1-显示	M	R
   */
  PictureData!: PictureDataRole;

  /**	ResourceRole[]	资源列表	O	R */
  Resources?: UserResourceRole[];
  /**	String	服务器ID	O	R */
  ServerId?: string;
  /**	Boolean	是否可以分配微信子用户	O	R */
  CanCreateWeChatUser?: boolean;
  /**	String	微信OpenID	O	RW */
  OpenId?: string;
}
