import { AbstractUrl } from '../../abstract.url';

export class PasswordInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Passwords`);
  }

  random() {
    return `${this.basic()}/Random`;
  }

  change() {
    return `${this.basic()}/Change`;
  }
}
