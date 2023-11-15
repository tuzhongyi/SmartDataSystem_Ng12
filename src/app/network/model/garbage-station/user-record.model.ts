import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

export class UserRecord implements IModel {
  /**	String	用户名	M	*/
  UserName!: string;
  /**	Int32	消息类型	M	*/
  MessageType!: number;
  /**	DateTime	时间	M	*/
  @Transform(transformDateTime) Time!: Date;
  /**	String	操作内容	O	*/
  Content?: string;
  /**	Int32	失败次数	O	*/
  Times?: number;
  /**	String	被操纵的用户名	O	*/
  OperatedUserName?: string;
  /**	String	被操作的用户ID	O	*/
  OperatedUserId?: string;
  /**	Boolean	True：成功，False：失败	O	*/
  Result?: boolean;
  /**	String	失败原因	O	*/
  Reason?: string;
}
