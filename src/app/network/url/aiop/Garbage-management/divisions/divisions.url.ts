import { BasicUrl } from '../../../base.url';

export abstract class DivisionsUrl {
  static get basic(): string {
    return `${BasicUrl.garbage.management}/Divisions`;
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
