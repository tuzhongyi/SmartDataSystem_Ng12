import { BasicUrl } from '../../../base.url';

export abstract class GarbageStationsUrls {
  protected static get basic(): string {
    return `${BasicUrl.garbage.management}/GarbageStations`;
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
