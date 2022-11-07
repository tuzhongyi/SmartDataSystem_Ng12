import { EventType } from 'src/app/enum/event-type.enum';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

export class WidescreenEventRecordItem<T = any> {
  data?: T;
  id!: string;
  name!: string;
  type!: EventType;
  time!: Date;
  images?: ImageControlModel[];
}
