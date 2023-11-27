import { BaseUrl } from '../../base.url';
import { ResourceAICamerasUrl } from './cameras/cameras.url';
import { ResourceCrossingUrl } from './crossing/resource-crossiong.url';
import { ResourceEncodeDevicesUrl } from './encode-devices/resource-encode-devices.url';
import { ResourceLabelsUrl } from './labels/resource-labels.url';
import { ResourceOnlineStatusUrl } from './online-status/resource-online-status.url';

export abstract class ResourcesUrl {
  static get basic(): string {
    return `${BaseUrl.aiop_service}/Resources`;
  }

  static base() {
    return this.basic;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }

  static deviceTypes() {
    return `${this.basic}/DeviceTypes`;
  }

  static camera() {
    return new ResourceAICamerasUrl(this.basic);
  }

  static label(id?: string) {
    let url = id ? this.item(id) : this.base();
    return new ResourceLabelsUrl(url);
  }
  static encodeDevice() {
    return new ResourceEncodeDevicesUrl(this.base());
  }
  static onlineStatus() {
    return new ResourceOnlineStatusUrl(this.base());
  }
  static crossing() {
    return new ResourceCrossingUrl(this.base());
  }
}
