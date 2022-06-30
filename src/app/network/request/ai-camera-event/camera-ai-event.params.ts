import { EventType } from "src/app/enum/event-type.enum";
import { ResourceType } from "src/app/enum/resource-type.enum";

export class GetCameraAIEventRecordsParams {
  PageIndex?: number;
  PageSize?: number;
  BeginTime!: Date | string;
  EndTime!: Date | string;
  EventTypes?: EventType[];
  ResourceIds?: string[];
  ResourceTypes?: ResourceType[];
  ResourceName?: string;
  ModelIds?: string[];
  ModelName?: string;
  ObjectLabels?: ObjectLabelsParams[];
}


export class ObjectLabelsParams {
  LabelId?: string;
  LabelName?: string;
  /** 置信度最小值(可选)：0-100 */
  MinConfidence?: number;
  /**置信度最大值(可选)：0-100 */
  MaxConfidence?: number;
}
