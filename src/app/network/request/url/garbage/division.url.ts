import { BaseGarbageUrl } from '../base.url';

export class DivisionUrl {
  static basic() {
    return `${BaseGarbageUrl}/Divisions`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static tree() {
    return `${this.basic()}/Tree`;
  }
  static garbagestations(id: string) {
    return `${this.item(id)}/GarbageStations`;
  }

  static excels() {
    return `${this.basic()}/Excels`;
  }

  static volume(id: string) {
    return new VolumeUrl(this.item(id));
  }
  static eventnumber(id: string) {
    return new EventNumberUrl(this.item(id));
  }

  static statistic(id?: string) {
    let base: string = id ? this.item(id) : this.basic();
    return new StatisticUrl(base);
  }
}
