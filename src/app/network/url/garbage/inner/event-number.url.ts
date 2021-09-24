import { IInnerUrl } from '../../base.url';
import { HistoryInnerUrl } from './history.url';

export class EventNumberInnerUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/EventNumbers`;
  }
  sum() {
    return `${this.basic()}/Sum`;
  }
  private _history?: HistoryInnerUrl;
  public get history(): HistoryInnerUrl {
    if (!this._history) {
      this._history = new HistoryInnerUrl(this.basic());
    }
    return this._history;
  }
}
