import { BaseUrl } from '../../base.url';

export abstract class ResourcesURL {
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
  static labels(id: string) {
    return `${this.basic}/${id}/Labels`;
  }
  static singleLabel(resourceId: string, labelId: string) {
    return `${this.basic}/${resourceId}/Labels/${labelId}`;
  }

  static deviceTypes() {
    return `${this.basic}/DeviceTypes`;
  }
}
