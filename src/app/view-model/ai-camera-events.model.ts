import { EventType } from '../enum/event-type.enum';
import { CommonModel } from './common-model';

export class AICameraEventsModel implements CommonModel {
  Id!: string;
  ImageUrl!: string;
  EventType!: string;
  ModelName!: string;
  EventTime!: string;
  ResourceType!: string;
  ResourceName!: string;
}

export interface AICameraEventsSearchInfo {
  Condition: string;
  BeginTime: Date;
  EndTime: Date;
  EventType: EventType;
  ModelName: string;
  Filter: boolean;
  PageIndex: number;
  PageSize: number;
}
