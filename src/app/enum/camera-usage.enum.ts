/**
 * 摄像机用途 Flags
 *
 * Volume	容量检测	1
 * MixedInto	混合投放	2
 * IllegalDrop	乱丢垃圾	3
 * GarbageFull	垃圾满溢	4
 */
export enum CameraUsage {
  /** 容量检测 */
  Volume = 1,
  /**混合投放 */
  MixedInto = 2,
  /**乱扔垃圾 */
  IllegalDrop = 3,
  /**垃圾满溢 */
  GarbageFull = 4,
}
