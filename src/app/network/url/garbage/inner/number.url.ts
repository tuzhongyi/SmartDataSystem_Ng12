import { IInnerUrl } from '../../base.url';
import { HistoryUrl } from './history.url';

export class NumberUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Number`;
  }

  list() {
    return `${this.basic()}/List`;
  }
  comparison() {
    return `${this.basic()}/Comparison`;
  }

  private _history?: HistoryUrl;
  public get history(): HistoryUrl {
    if (!this._history) {
      this._history = new HistoryUrl(this.basic());
    }
    return this._history;
  }
}
