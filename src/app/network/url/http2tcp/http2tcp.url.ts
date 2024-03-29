import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

class DeviceSessionUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/DeviceSessions`);
  }

  localDevices(id: string) {
    return `${this.item(id)}/LocalDevices`;
  }

  forwarding(id: string) {
    return `${this.item(id)}/Forwarding`;
  }
}

export class Http2TCPUrl {
  static device = {
    session: new DeviceSessionUrl(BaseUrl.http2tcp),
  };
}
