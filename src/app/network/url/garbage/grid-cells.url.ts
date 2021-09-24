import { BaseGarbageUrl } from '../base.url';
import { EventNumberInnerUrl } from './inner/event-number.url';
import { StatisticInnerUrl } from './inner/statistic.url';

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

  private static _statistic?: StatisticInnerUrl;
  public static get statistic(): StatisticInnerUrl {
    if (!this._statistic) {
      this._statistic = new StatisticInnerUrl(this.basic());
    }
    return this._statistic;
  }

  static eventNumber(id: string) {
    return new EventNumberInnerUrl(this.item(id));
  }
}
