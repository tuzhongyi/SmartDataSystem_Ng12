import { IInnerUrl } from '../../base.url';

export class HistoryInnerUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/History`;
  }

  list() {
    return `${this.basic()}/List`;
  }
}
