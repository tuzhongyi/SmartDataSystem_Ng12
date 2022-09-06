export enum StationState {
  Normal = 0,
  /**满溢 */
  Full = 1,
  /**异常 */
  Error = 2,
  /**	火灾检测	3 */
  Smoke = 3,
  /**	紧急按钮	4 */
  PanicButton = 4,
}
