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

// 需要导入到CSV中的字段
export class EventNumberStatisticCSV {
  Id!: string;
  Name!: string;
  ParentName!: string;
  EventNumber!: string;
  [key: string]: string;

}
// 需要导入到 XLSX中的字段
export class EventNumberStatisticXLSX {
  Id!: string;
  Name!: string;
  ParentName!: string;
  EventNumber!: string;
  [key: string]: string;
}