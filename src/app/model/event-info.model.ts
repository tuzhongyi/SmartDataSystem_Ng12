import { AIModelTrigger } from "./ai-model-trigger.model";

/** 事件信息 */
export interface EventInfo {
  /**	Int32	事件类型	M */
  Type: number;
  /**	String	事件名称	M */
  Name: string;
  /**	AIModelTrigger[]	事件对应的AIOP分析模型	O */
  AIModels?: AIModelTrigger[];
  /**	Int32	事件级别	M */
  Level: number;
}
