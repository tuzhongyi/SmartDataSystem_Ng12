import { IInnerUrl } from '../../base.url';

export class MemberInnerUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Members`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}
