import { EventType } from 'src/app/enum/event-type.enum';

export class AICameraEventsModel<T = any> {
  Id!: string;
  ImageUrl!: string;
  AsyncImageUrl!: Promise<string>;
  EventType!: string;
  ModelName!: string;
  EventTime!: Date;
  ResourceType!: string;
  ResourceName!: string;

  AICameraId?: string;

  RawData?: T;
}

export interface AICameraEventsSearchInfo {
  Condition: string;
  BeginTime: Date;
  EndTime: Date;
  EventType: EventType;
  ModelName?: string;
  Filter: boolean;
  PageIndex: number;
  PageSize: number;
}
