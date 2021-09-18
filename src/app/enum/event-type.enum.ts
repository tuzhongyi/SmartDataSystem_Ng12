/**
 *  事件类型
 *
 * IllegalDrop	乱丢垃圾事件	1
 * MixedInto	混合投放事件	2
 * GarbageVolume	垃圾容量事件	3
 * GarbageFull	垃圾满溢事件	4
 * GarbageDrop	小包垃圾落地	5
 * GarbageDropTimeout	小包垃圾滞留	6
 * GarbageDropHandle	小包垃圾处置完成	7
 */
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
   *	小包垃圾落地	5
   */
  GarbageDrop = 5,
  /**
   *	小包垃圾滞留	6
   */
  GarbageDropTimeout = 6,
  /**
   *	小包垃圾处置完成	7
   */
  GarbageDropHandle = 7,
}
