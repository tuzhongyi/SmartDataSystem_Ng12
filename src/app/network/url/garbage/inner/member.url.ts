import { InnerUrl } from '../../base.url';

export class MemberInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Members`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}
