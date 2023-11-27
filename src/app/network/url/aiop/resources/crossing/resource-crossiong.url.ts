import { AbstractUrl } from '../../../abstract.url';

export class ResourceCrossingUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Crossings`);
  }
}
