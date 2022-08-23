import { EventType } from "@angular/router";
import { TimeUnit } from "../enum/time-unit.enum";
import { UserResourceType } from "../enum/user-resource-type.enum";
import { CommonModel } from "./common-model";

export class EventNumberChartModel implements CommonModel {
  Id!: string;
  Name!: string;
  ParentId!: string | null;
  ParentModel!: EventNumberChartModel | null;
  EventNumber!: string;
  Type!: UserResourceType;
}



export interface EventNumberChartSearchInfo {
  CurrentTime: Date;
  TimeUnit: TimeUnit;
  ResourceId: string
}

// 需要导入到CSV中的字段
export class EventNumberChartCSV {
  Id!: string;
  Name!: string;
  ParentName!: string;
  EventNumber!: string;
  [key: string]: string;

}
// 需要导入到 XLSX中的字段
export class EventNumberChartXLSX {
  Id!: string;
  Name!: string;
  ParentName!: string;
  EventNumber!: string;
  [key: string]: string;
}