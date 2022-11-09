import { AbstractUrl } from '../../abstract.url';
import { HistoryInnerUrl } from './history.url';

export class GarbageCountInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageCount`);
  }
  private _history?: HistoryInnerUrl;
  public get history(): HistoryInnerUrl {
    if (!this._history) {
      this._history = new HistoryInnerUrl(this.basic());
    }
    return this._history;
  }
}
