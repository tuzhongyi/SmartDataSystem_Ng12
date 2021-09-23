import { IInnerUrl } from '../../base.url';
import { HistoryUrl } from './history.url';

export class EventNumberUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/EventNumbers`;
  }
  sum() {
    return `${this.basic()}/Sum`;
  }
  private _history?: HistoryUrl;
  public get history(): HistoryUrl {
    if (!this._history) {
      this._history = new HistoryUrl(this.basic());
    }
    return this._history;
  }
}
