import { AbstractUrl } from '../../abstract.url';

export class TrashCanInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/TrashCans`);
  }
}
