export enum EventType {
  /**
   * 	乱扔垃圾事件	1
   */
  IllegalDrop = 1,
  /**
   *	混合投放事件	2
   */
  MixedInto = 2,
  /**
   *	垃圾容量事件	3
   */
  GarbageVolume = 3,
  /**
   *	垃圾满溢事件	4
   */
  GarbageFull = 4,
  /**
   *	垃圾滞留(垃圾未投放入垃圾厢)	5
   */
  GarbageRetention = 5,
  /**
   *	垃圾滞留超时(摄像机监控期间仍然在地上)	6
   */
  GarbageRetentionTimeout = 6,
  /**
   *	垃圾滞留已处置(摄像机监控期间，落地垃圾消失)	7
   */
  GarbageRetentionHandled = 7,
}
