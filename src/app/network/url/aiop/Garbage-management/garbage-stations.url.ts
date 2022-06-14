import { GarbageManagementUrl } from "./garbage-management.url";

export abstract class GarbageStationsUrl extends GarbageManagementUrl {
  static get basic(): string {
    return `${super.basic}/GarbageStations`;
  }

  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }

}