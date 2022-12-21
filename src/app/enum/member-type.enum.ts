/*
 * @Author: pmx
 * @Date: 2022-12-16 11:19:57
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-21 10:20:54
 */
/**
 * 人员类型
 * 其他人员	0
 * 志愿者	1
 * 卫生干部	2
 */
export enum MemberType {
  /** 其他人员	0 */
  other = 0,
  /**	志愿者	1 */
  volunteer = 1,
  /**	卫生干部	2 */
  healthworker = 2,
}

export enum CollectionMemberType {
  // 其他人员
  Other = 0,

  // 清运人员
  Collection = 1,
}
