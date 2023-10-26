import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/** 服务版本信息 */
export class ServiceVersion implements IModel {
  /**	String	版本号 1.0.1	M */
  Version!: string;
  /**	DateTime	编译时间	M */
  @Transform(transformDateTime)
  BuildDate!: Date;
  /**	String	公司名	M */
  Company!: string;
}
