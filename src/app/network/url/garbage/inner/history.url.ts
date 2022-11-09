import { AbstractUrl } from '../../abstract.url';

export class HistoryInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/History`);
  }
}
