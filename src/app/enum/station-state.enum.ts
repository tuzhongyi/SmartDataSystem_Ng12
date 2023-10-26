export enum StationState {
  Normal = 0,
  /**满溢 */
  Full = 1,
  /**异常 */
  Error = 2,
  /**	火灾检测 */
  Smoke = 3,
  /**	紧急按钮 */
  PanicButton = 4,
}
