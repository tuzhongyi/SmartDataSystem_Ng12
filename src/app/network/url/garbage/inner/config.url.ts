import { InnerUrl } from '../../base.url';

export class ConfigInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Config`;
  }
  item(type: string) {
    return `${this.basic()}/${type}`;
  }
}
