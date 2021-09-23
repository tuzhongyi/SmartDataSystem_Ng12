import { IInnerUrl } from '../../base.url';

export class HistoryUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/History`;
  }

  list() {
    return `${this.basic()}/List`;
  }
}
