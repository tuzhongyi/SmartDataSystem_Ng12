/**
 *	Int32	隐私数据显示
 *  3-不显示|部分显示，1-显示
 *  隐私数据包括：姓名，证件号，车牌号等。	M	RW
 *
 * @export
 * @enum {number}
 */
export enum PrivacyDataRole {
  /** 1-显示 */
  display = 1,
  /** 3-不显示|部分显示 */
  none = 3,
}
