/**
 *	静态数据操作权限
 *  0-不允许，1-允许
 *  包括：小区所有的静态信息
 *
 * @export
 * @enum {number}
 */
export enum StaticDataRole {
  /** 1-允许 */
  enabled = 1,
  /** 0-不允许 */
  disabled = 0,
}
