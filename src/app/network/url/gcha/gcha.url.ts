import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export class GCHAUrl {
  private static basic = `${BaseUrl.gcha}/GCHA`;

  static get device() {
    return new GCHADeviceUrl(this.basic);
  }
  static access = {
    server: () => {
      return `${this.basic}/AccessServers`;
    },
  };
}

class GCHADeviceUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Devices`);
  }

  register() {
    return `${this.basic()}/Register`;
  }
  registrations(id?: string) {
    let node = '/';
    if (id) {
      node = `/${id}`;
    }
    return `${this.basic()}/Registrations${node}`;
  }
  information(id: string) {
    return `${this.item(id)}/Information`;
  }
  configuration(id: string) {
    return `${this.item(id)}/Configuration`;
  }

  event = {
    record: (id: string) => {
      return `${this.item(id)}/Events/Records`;
    },
  };
}
