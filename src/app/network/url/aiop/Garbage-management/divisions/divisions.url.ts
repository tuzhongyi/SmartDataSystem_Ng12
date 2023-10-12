import { BaseUrl } from '../../../base.url';

export abstract class DivisionsUrl {
  static get basic(): string {
    return `${BaseUrl.garbage.garbage_management}/Divisions`;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }
  static garbageStations(id: string) {
    return `${this.basic}/${id}/GarbageStations`;
  }
}
