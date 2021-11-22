import { InnerUrl } from '../../base.url';

export class TypeInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Types`;
  }
  item(type: string | number) {
    return `${this.basic()}/${type}`;
  }
}
