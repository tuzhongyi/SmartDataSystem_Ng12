import { IInnerUrl } from '../../base.url';

export class TrashCanUrl implements IInnerUrl {
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
