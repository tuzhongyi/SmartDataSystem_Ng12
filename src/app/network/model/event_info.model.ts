import { EventType } from 'src/app/enum/event_type.enum';
import { AIModelTrigger } from './ai_model_trigger.model';

/** 事件信息 */
export class EventInfo {
  /**	Int32	事件类型	M */
  Type!: EventType;
  /**	String	事件名称	M */
  Name!: string;
  /**	AIModelTrigger[]	事件对应的AIOP分析模型	O */
  AIModels?: AIModelTrigger[];
  /**	Int32	事件级别	M */
  Level!: number;
}
