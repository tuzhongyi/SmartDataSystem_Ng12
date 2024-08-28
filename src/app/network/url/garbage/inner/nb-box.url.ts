import { AbstractUrl } from '../../abstract.url';

export class NBBoxeInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/NBBoxes`);
  }

  reboot() {
    return `${this.basic()}/Reboot`;
  }
  status() {
    return `${this.basic()}/Status`;
  }
  history() {
    return `${this.basic()}/History`;
  }
}
