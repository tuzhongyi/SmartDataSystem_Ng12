import { AbstractUrl } from '../../abstract.url';

export class AbnormalInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Abnormals`);
  }
  statistic() {
    return `${this.basic()}/Statistic`;
  }
}
