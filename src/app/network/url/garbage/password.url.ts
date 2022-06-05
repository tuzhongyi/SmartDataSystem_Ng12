/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:27
 * @Last Modified by: zzl
 * @Last Modified time: 2021-12-21 17:26:04
 */

import { BaseUserUrl } from '../base.url';

export class PasswordUrl {
  static basic() {
    return `${BaseUserUrl}/Passwords`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static checkCode(mobileNo?: string) {
    let params = '';
    if (mobileNo) {
      params = `?=${mobileNo}`;
    }
    return `${this.basic()}/CheckCode${params}`;
  }
  static checkMobileNo(mobileNo: string) {
    return `${this.basic()}/CheckMobileNo?MobileNo=${mobileNo}`;
  }
}
