import { Type } from 'class-transformer';
import { AIModelType } from '../../enum/ai-model-type.enum';
import { IModel } from './model.interface';

/** 分析模型触发条件 */
export class AIModelTrigger implements IModel {
  /**	String	模型ID	M */
  ModelId!: string;
  /**	String	模型类型，默认：AIOP，AIHW	M */
  ModelType!: AIModelType;
  /**	String	模型名称	M */
  ModelName!: string;
  /**	AIModelTriggerLabel[]	触发事件的标签列表	O */
  @Type(() => AIModelTriggerLabel)
  Labels?: AIModelTriggerLabel[];
}
/**	分析模型触发标签条件	*/
export class AIModelTriggerLabel implements IModel {
  /**	String	标签ID	M	*/
  LabelId!: string;
  /**	String	标签数值	M	*/
  LabelValue!: string;
  /**	String	数值	O	*/
  DataValue?: string;
  /**	String	标签名称	M	*/
  LabelName!: string;
}
