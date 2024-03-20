/**	RobotState (机器人状态)	*/
export enum RobotState {
  /**	无	*/
  None = 0,
  /**	繁忙状态	*/
  Busy = 1,
  /**	充电状态	*/
  Charging = 2,
  /**	低电量	*/
  LoBAT = 3,
  /**	异常	*/
  Error = 4,
  /**	升级中	*/
  Upgrading = 5,
  /**	信号丢失（离线）	*/
  Offline = 6,
}
