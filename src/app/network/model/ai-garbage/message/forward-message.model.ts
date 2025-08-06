import { Method } from 'axios';
import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { transformMessageContent } from '../../transform.model';

/**	ForwardMessage	*/
export class ForwardMessage implements IModel {
  /**	String	HTTP协议方法，GET、POST、PUT、DELETE、	M	*/
  Method!: Method;
  /**	String	相对URL，如：api/ver10/Deployment/Events/1	M	*/
  RelativeUrl!: string;
  /**	String	内容类型，参见HTTP的Content-Type	O	*/
  ContentType?: string;
  /**	String	载荷内容的Base64字符串	O	*/
  @Transform(transformMessageContent)
  Content?: string;
  /**	String	用户名	O */
  Username?: string;
  /**	String	密码	O */
  Password?: string;
}
