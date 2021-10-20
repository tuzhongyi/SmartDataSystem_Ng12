import { IInnerUrl } from '../../base.url';
import { HistoryInnerUrl } from './history.url';

export class NumberInnerUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Number`;
  }

  list() {
    return `${this.basic()}/List`;
  }

  sum() {
    return `${this.basic()}/Sum`;
  }

  comparison() {
    return `${this.basic()}/Comparison`;
  }

  private _history?: HistoryInnerUrl;
  public get history(): HistoryInnerUrl {
    if (!this._history) {
      this._history = new HistoryInnerUrl(this.basic());
    }
    return this._history;
  }
}
