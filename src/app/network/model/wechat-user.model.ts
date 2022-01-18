import { Gender } from 'src/app/enum/gender.enum';
import { IModel } from './model.interface';
import { UserResource } from './user.model';

/** 微信用户信息 */
export class WeChatUser implements IModel {
  /**	String	用户ID	O	RW */
  Id?: string;
  /**	String	微信OpenID	O	RW */
  OpenId?: string;
  /**	String	手机号码	O	RW */
  MobileNo?: string;
  /**	String	名字	O	RW */
  FirstName?: string;
  /**	String	姓	O	RW */
  LastName?: string;
  /**	Int32	性别	O	RW */
  Gender?: Gender;
  /**	ResourceRole[]	资源列表	O	RW */
  Resources?: UserResource[];
  /**	String	服务器ID	O	R */
  ServerId?: string;
  /**	String	描述信息	O	RW */
  Note?: string;
  /**	Boolean	是否可以分配微信子用户	O	R */
  CanCreateWeChatUser?: boolean;
  /**	Int32[]	停止推送的事件类型	O	RW */
  OffEvents?: number[];
}
