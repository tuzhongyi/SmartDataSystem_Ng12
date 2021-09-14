/*
 * @Author: pmx
 * @Date: 2021-09-14 13:45:05
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-14 13:47:15
 */

import { BaseGarbage } from './base.url';

export class StationUrl {
  static basic() {
    return `${BaseGarbage}/GarbageStations`;
  }
  static list() {
    return this.basic() + '/List';
  }
}
