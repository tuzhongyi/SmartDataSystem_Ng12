/*
 * @Author: pmx
 * @Date: 2022-11-03 14:45:48
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 16:13:55
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

  GarbageDropTimeoutHandle = 255,
}

export enum VehicleEventType {
  None = 0,

  // 清运称重事件
  Collection = 1,

  // 继电器状态变更事件
  RelayStateChange = 2,

  // 清运车辆上下线记录
  VehicleOnline = 3,

  // 摄像机上下线记录
  CameraOnline = 4,
}
