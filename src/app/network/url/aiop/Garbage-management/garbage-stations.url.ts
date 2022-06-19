import { GarbageManagementURL } from "./garbage-management.url";

export abstract class GarbageStationsURL extends GarbageManagementURL {
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