/**	BatteryState (电池状态)	*/
export enum BatteryState {
  /**	正常	*/
  Normal = 0,
  /**	充电中	*/
  Charging = 1,
  /**	无法充电	*/
  Unable = 2,
  /**	欠压、亏电	*/
  UnderVoltage = 3,
}
