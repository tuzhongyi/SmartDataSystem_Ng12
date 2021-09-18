/**
 * 垃圾投放点类型
 * 多分类垃圾厢房（干，湿，可回收，有毒有害）	1
 * 多分类露天垃圾投放点（干，湿，可回收，有毒有害）	2
 * 二分类垃圾厢房（干，湿）	3
 * 二分类露天垃圾投放点（干，湿）	4
 */
export enum DumpPointType {
  /** 多分类垃圾厢房（干，湿，可回收，有毒有害）	1   */
  MultiClassGarbageStation = 1,
  /** 多分类露天垃圾投放点（干，湿，可回收，有毒有害）	2   */
  MultiClassOpenedGarbageStation = 2,
  /** 二分类垃圾厢房（干，湿）	3   */
  TwoClassGarbageStation = 3,
  /** 二分类露天垃圾投放点（干，湿）	4   */
  TwoClassOpenedGarbageStation = 4,
}
