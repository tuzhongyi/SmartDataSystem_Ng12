import { AbstractUrl } from '../../../abstract.url';

export class ResourceOnlineStatusUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/OnlineStatus`);
  }

  record() {
    return new ResourceOnlineStatusRecordUrl(this.basic());
  }
}

export class ResourceOnlineStatusRecordUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }
}
