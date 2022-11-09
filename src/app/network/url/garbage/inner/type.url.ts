import { AbstractUrl } from '../../abstract.url';

export class TypeInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Types`);
  }
  override item<T = string | number>(type: T) {
    return `${this.basic()}/${type}`;
  }
}
