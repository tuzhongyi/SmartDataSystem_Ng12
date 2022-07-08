import { GarbageStationsUrls } from "../garbage-stations.url";

export abstract class GarbageStationTypesUrls extends GarbageStationsUrls {
  protected static get basic(): string {
    return `${super.basic}/Types`;
  }
  static create() {
    return this.basic;
  }
  static list() {
    return this.basic;
  }
  static item(id: string) {
    return `${this.basic}/${id}`
  }
}