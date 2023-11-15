import { AbstractUrl } from '../../abstract.url';

export class UserRecordInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/UserRecords`);
  }
}
