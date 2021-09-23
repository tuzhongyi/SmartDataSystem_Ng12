/**
 *	Int32	用户数据操作权限
 *  0-不允许，1-允许	M	RW
 *
 * @export
 * @enum {number}
 */
export enum UserDataRole {
  /** 1-允许 */
  enabled = 1,
  /** 0-不允许 */
  disabled = 0,
}
