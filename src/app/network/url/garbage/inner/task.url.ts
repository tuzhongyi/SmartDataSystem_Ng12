import { AbstractUrl } from '../../abstract.url';

export class TaskInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Tasks`);
  }
  finish(id: string) {
    return `${this.item(id)}/Finish`;
  }
}
