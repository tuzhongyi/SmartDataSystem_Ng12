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
  /** 物业	3 */
  property = 3,
  /**	第三方	4	*/
  thirdpart = 4,
}

export enum CollectionMemberType {
  // 其他人员
  Other = 0,

  // 清运人员
  Collection = 1,
}
