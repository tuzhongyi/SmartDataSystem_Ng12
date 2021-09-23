import { IInnerUrl } from '../base.url';
import { GarbageStationUrl } from './garbage-station.url';

export class SRServiceUrl {
  static basic() {
    return `${GarbageStationUrl}/SRServers`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static sync(id: string) {
    return `${this.item(id)}/Sync`;
  }
  static preview() {
    return `${this.basic()}/PreviewUrls`;
  }
  static vod() {
    return `${this.basic()}/VodUrls`;
  }
}
