import { EventType } from "@angular/router";
import { UserResourceType } from "../enum/user-resource-type.enum";
import { CommonModel } from "./common-model";

export class EventNumberStatisticModel implements CommonModel {
  Id!: string;
  Name!: string;
  ParentId!: string | null;
  ParentModel!: EventNumberStatisticModel | null;
  EventNumber!: string;
  Type!: UserResourceType;
}



export interface EventNumberStatisticSearchInfo {
  // Condition: string;
  BeginTime: Date;
  EndTime: Date;
  // EventType: EventType;
  // ModelName: string;
  // Filter: boolean;
  ResourceType: UserResourceType;
  ResourceId: string;
}