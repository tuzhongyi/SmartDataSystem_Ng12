import { BaseUrl } from '../../../base.url';

export abstract class GarbageStationsUrls {
  protected static get basic(): string {
    return `${BaseUrl.garbage.garbage_management}/GarbageStations`;
  }

  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }
  static Cameras(id: string) {
    return `${this.basic}/${id}/Cameras`;
  }
}
