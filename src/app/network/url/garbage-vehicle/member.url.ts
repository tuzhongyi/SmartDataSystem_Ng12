/*
 * @Author: pmx 
 * @Date: 2022-11-03 14:46:11 
 * @Last Modified by:   pmx 
 * @Last Modified time: 2022-11-03 14:46:11 
 */
import { BasicUrl.garbage.vehicle } from '../base.url';

export abstract class GarbageVehicleMemberUrl {
  static basic() {
    return `${BasicUrl.garbage.vehicle}/Members`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excels() {
    return `${this.basic()}/Excels`;
  }
}
