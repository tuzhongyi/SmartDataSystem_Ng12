/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:35
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-13 15:42:02
 */
import { BaseGarbage } from './base.url';

export class DivisionUrl {
  static basic() {
    return `${BaseGarbage}/Divisions`;
  }
  static list(): string {
    return this.basic() + '/List';
  }
}
