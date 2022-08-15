import { EventType } from "@angular/router";
import { TimeUnit } from "../enum/time-unit.enum";
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
  BeginTime: Date;
  EndTime: Date;
  ResourceType: UserResourceType;
  ResourceId: string;
<<<<<<< HEAD
  TimeUnit: TimeUnit;
=======
>>>>>>> f8a7cef3ac8c4fd6c0e20c5dbbb79c8071b48bfb
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