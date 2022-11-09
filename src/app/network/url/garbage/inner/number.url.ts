import { AbstractUrl } from '../../abstract.url';
import { HistoryInnerUrl } from './history.url';

export class NumberInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Number`);
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
