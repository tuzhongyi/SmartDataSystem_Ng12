/*
 * @Author: pmx
 * @Date: 2022-11-03 14:46:08
 * @Last Modified by:   pmx
 * @Last Modified time: 2022-11-03 14:46:08
 */
import { BasicUrl } from '../base.url';

export abstract class GarbageVehicleSRServerUrl {
  static basic() {
    return `${BasicUrl.garbage.vehicle}/SRServers`;
  }

  static preview() {
    return `${this.basic()}/PreviewUrls`;
  }
  static vod() {
    return `${this.basic()}/VodUrls`;
  }
}
