import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { transformMessageContent } from '../../transform.model';

/**	ResponseMessage	*/
export class ResponseMessage implements IModel {
  /**	String	内容类型，参见HTTP的Content-Type	M	*/
  ContentType!: string;
  /**	String	载荷内容的Base64字符串	O	*/
  @Transform(transformMessageContent)
  Content?: string;
  /**	Int32	状态码	O */
  StatusCode?: number;
}
export class ResponseMessageModel extends ResponseMessage {
  Id!: string;
}
