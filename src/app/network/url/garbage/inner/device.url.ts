import { AbstractUrl } from '../../abstract.url';

export class DeviceInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Devices`);
  }
  command() {
    return `${this.basic()}/Commands`;
  }
}
