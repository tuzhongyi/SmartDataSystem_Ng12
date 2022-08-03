import { EventType } from "@angular/router";
import { UserResourceType } from "../enum/user-resource-type.enum";
import { CommonModel } from "./common-model";

export class IllegalDropTotalModel implements CommonModel {
  Id!: string;
  Name!: string;
  ParentId!: string | null;
  ParentName!: string;
}



export interface IllegalDropTotalSearchInfo {
  // Condition: string;
  // BeginTime: Date;
  // EndTime: Date;
  // EventType: EventType;
  // ModelName: string;
  // Filter: boolean;
  resourceType: UserResourceType;
}