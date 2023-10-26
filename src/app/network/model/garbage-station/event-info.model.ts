import { EventType, VehicleEventType } from 'src/app/enum/event-type.enum';
import { IModel } from '../model.interface';
import { AIModelTrigger } from './ai-model-trigger.model';

/** 事件信息 */
export class EventInfo implements IModel {
  /**	Int32	事件类型	M */
  Type!: EventType;
  /**	String	事件名称	M */
  Name!: string;
  /**	AIModelTrigger[]	事件对应的AIOP分析模型	O */
  AIModels?: AIModelTrigger[];
  /**	Int32	事件级别	M */
  Level!: number;
}

export class VehicleEventInfo implements IModel {
  Type!: VehicleEventType;
  Name!: string;
  AIModels?: AIModelTrigger[];
  Level!: number;
}
