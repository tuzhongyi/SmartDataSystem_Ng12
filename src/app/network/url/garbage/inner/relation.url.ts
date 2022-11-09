import { AbstractUrl } from '../../abstract.url';

export class RelationInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Members`);
  }
  sync() {
    return `${this.basic()}/Sync`;
  }
}
