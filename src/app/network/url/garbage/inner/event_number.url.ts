import { InnerUrl } from '../../base.url';
import { HistoryInnerUrl } from './history.url';

export class EventNumberInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/EventNumbers`;
  }
  sum() {
    return `${this.basic()}/Sum`;
  }

  list() {
    return `${this.basic()}/List`;
  }

  private _history?: HistoryInnerUrl;
  public get history(): HistoryInnerUrl {
    if (!this._history) {
      this._history = new HistoryInnerUrl(this.basic());
    }
    return this._history;
  }
}
