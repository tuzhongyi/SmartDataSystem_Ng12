import { Point } from "./point.model";

/**摄像机AI规则信息 */
export class CameraAIRule {
  /**规则ID */
  RuleId!: string;
  /**触发类型 */
  TriggerType?: number;
  /**方向 */
  Direction?: number;
  /**规则的归一化多边形(可选) */
  Polygon?: Point[];
  /**触发规则的对象ID(可选) ，可以在CameraAIData的Objects中找到 */
  ObjectIds?: string[];
}
