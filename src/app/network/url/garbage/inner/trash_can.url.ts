import { InnerUrl } from '../../base.url';

export class TrashCanInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/TrashCans`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}
