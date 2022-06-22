import { CameraAIData } from "./camera-ai-data.model";
import { CameraAIRule } from "./camera-ai-rule.model";
import { EventRecord } from "./event-record.model";

/**摄像机AI事件 */
export class CameraAIEventRecord extends EventRecord {
  /**AI事件内容 */
  Data!: CameraAIData;
  /**AI事件规则(可选) */
  Rules?: CameraAIRule[];
}
