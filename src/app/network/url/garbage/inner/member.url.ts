import { AbstractUrl } from '../../abstract.url';

export class MemberInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Members`);
  }
}
