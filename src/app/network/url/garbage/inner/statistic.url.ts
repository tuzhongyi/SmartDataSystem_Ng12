import { IInnerUrl } from '../../base.url';
import { GarbageCountUrl } from './garbage-count.url';
import { NumberUrl } from './number.url';

export class StatisticUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Statistic`;
  }

  private _number?: NumberUrl;
  public get number(): NumberUrl {
    if (!this._number) {
      this._number = new NumberUrl(this.basic());
    }
    return this._number;
  }

  private _garbagecount?: GarbageCountUrl;
  public get garbagecount(): GarbageCountUrl {
    if (!this._garbagecount) {
      this._garbagecount = new GarbageCountUrl(this.basic());
    }
    return this._garbagecount;
  }
}
