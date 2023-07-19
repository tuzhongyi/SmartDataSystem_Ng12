import { Transform } from 'class-transformer';
import { DurationParams } from '../../request/IParams.interface';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

export class AIGarbageServiceVersion extends DurationParams implements IModel {
  /**	String	版本号 1.0.1	M	*/
  Version!: string;
  /**	DateTime	编译时间	M	*/
  @Transform(transformDateTime)
  BuildDate!: Date;
  /**	String	公司名	M	*/
  Company!: string;
}
