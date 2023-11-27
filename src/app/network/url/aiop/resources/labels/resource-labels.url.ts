import { AbstractUrl } from '../../../abstract.url';

export class ResourceLabelsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Labels`);
  }

  batch(id: string) {
    return `${this.item(id)}/Batch`;
  }
}
