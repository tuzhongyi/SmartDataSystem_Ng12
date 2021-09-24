import { BaseGarbageUrl } from '../base.url';
import { EventNumberUrl } from './inner/event-number.url';
import { StatisticUrl } from './inner/statistic.url';

export class GridCellUrl {
  static basic() {
    return `${BaseGarbageUrl}/GridCell`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static garbagestations(id: string) {
    return `${this.item(id)}/GarbageStations`;
  }
  static excels() {
    return `${this.basic()}/Excels`;
  }

  private static _statistic?: StatisticUrl;
  public static get statistic(): StatisticUrl {
    if (!this._statistic) {
      this._statistic = new StatisticUrl(this.basic());
    }
    return this._statistic;
  }

  static eventNumber(id: string) {
    return new EventNumberUrl(this.item(id));
  }
}
