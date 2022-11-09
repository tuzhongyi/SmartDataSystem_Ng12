import { AbstractUrl } from '../../abstract.url';
import { GarbageCountInnerUrl } from './garbage_count.url';
import { NumberInnerUrl } from './number.url';

export class StatisticInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Statistic`);
  }

  private _number?: NumberInnerUrl;
  public get number(): NumberInnerUrl {
    if (!this._number) {
      this._number = new NumberInnerUrl(this.basic());
    }
    return this._number;
  }

  private _garbagecount?: GarbageCountInnerUrl;
  public get garbagecount(): GarbageCountInnerUrl {
    if (!this._garbagecount) {
      this._garbagecount = new GarbageCountInnerUrl(this.basic());
    }
    return this._garbagecount;
  }
}
