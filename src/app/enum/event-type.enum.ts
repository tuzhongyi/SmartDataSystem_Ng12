/*
 * @Author: pmx
 * @Date: 2022-11-03 14:45:48
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-21 17:32:49
 */
export enum EventType {
  None = 0,
  /**乱扔垃圾事件 */
  IllegalDrop = 1,
  /**混合投放事件 */
  MixedInto = 2,
  /**垃圾容量事件 */
  GarbageVolume = 3,
  /**垃圾满溢事件 */
  GarbageFull = 4,
  /**垃圾滞留(垃圾未投放入垃圾厢) */
  GarbageDrop = 5,
  /**垃圾滞留超时(摄像机监控期间仍然在地上) */
  GarbageDropTimeout = 6,
  /**垃圾滞留已处置(摄像机监控期间，落地垃圾消失) */
  GarbageDropHandle = 7,

  /**小包垃圾滞留超级超时 */
  GarbageDropSuperTimeout = 8,

  /**	垃圾投放预警 */
  DropWarning = 9,
  /**	车辆占道，扩展功能事件 */
  VehiclePresence = 11,
  /**	紧急按钮 */
  PanicButton = 12,
  /**	火灾检测 */
  Smoke = 13,
  /**	大件垃圾数据更新 */
  ConstructionData = 14,
  /**	垃圾厢房设备状态 */
  DeviceStatus = 15,
  /**	水渍报警 */
  Sewage = 16,
  /**	街道系统督办 */
  Supervision1 = 20,
  /**	区系统督办 */
  Supervision2 = 21,

  GarbageDropTimeoutHandle = 255,
}

export enum VehicleEventType {
  None = 0,

  // 清运称重事件
  Collection = 21,

  // 继电器状态变更事件
  RelayStateChange = 22,

  // 清运车辆上下线记录
  VehicleOnline = 3,
  VehicleOnline2 = 23,

  // 摄像机上下线记录
  CameraOnline = 24,
}
