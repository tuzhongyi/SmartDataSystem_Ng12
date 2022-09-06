import { Transform, Type } from 'class-transformer';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { transformDateTime } from '../../model/transform.model';

export class DisarmMessageData {
  Id!: string;
  ResourceType: ResourceType = ResourceType.Camera;
  Name!: string;
  IOStatus: number = 0;
  @Transform(transformDateTime)
  UpdateTime: Date = new Date();
}
export class DisarmMessage {
  Id!: string;
  @Transform(transformDateTime)
  Time: Date = new Date();
  MessageType: number = 0;
  @Type(() => DisarmMessageData)
  Data: DisarmMessageData = new DisarmMessageData();
}
