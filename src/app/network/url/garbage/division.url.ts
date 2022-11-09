import { BasicUrl } from '../base.url';
import { EventNumberInnerUrl } from './inner/event_number.url';
import { StatisticInnerUrl } from './inner/statistic.url';
import { VolumeInnerUrl } from './inner/volume.url';

export class DivisionUrl {
  static basic() {
    return `${BasicUrl.garbage.management}/Divisions`;
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
    return new VolumeInnerUrl(this.item(id));
  }
  static eventnumber(id?: string) {
    let base = id ? this.item(id) : this.basic();
    return new EventNumberInnerUrl(base);
  }

  static statistic(id?: string) {
    let base: string = id ? this.item(id) : this.basic();
    return new StatisticInnerUrl(base);
  }
}
