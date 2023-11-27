import { AbstractUrl } from '../../../abstract.url';

export class ResourceEncodeDevicesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/EncodeDevices`);
  }
  protocols() {
    return `${this.basic}/Protocols`;
  }
}
