import { Transform } from 'class-transformer';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { IIdModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

export class ResourceOnlineStatusRecord implements IIdModel {
  /**	String	唯一标识符	M	*/ Id!: string;
  /**	DateTime	发生时间	M	*/ @Transform(transformDateTime) Time!: Date;
  /**	Int32	状态：0-正常，1-异常/离线	M	*/ OnlineStatus!: number;
  /**	String	资源ID	M	*/ ResourceId!: string;
  /**	String	资源名称	M	*/ ResourceName!: string;
  /**	String	资源类型：	M	*/ ResourceType!: ResourceType;
}
