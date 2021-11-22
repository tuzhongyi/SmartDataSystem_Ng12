import { InnerUrl } from '../../base.url';

export class HistoryInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/History`;
  }

  list() {
    return `${this.basic()}/List`;
  }
}
