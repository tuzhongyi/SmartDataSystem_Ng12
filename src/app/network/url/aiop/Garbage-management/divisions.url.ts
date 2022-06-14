import { GarbageManagementUrl } from './garbage-management.url';

export abstract class DivisionsUrl extends GarbageManagementUrl {
  static get basic(): string {
    return `${super.basic}/Divisions`;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }
}
