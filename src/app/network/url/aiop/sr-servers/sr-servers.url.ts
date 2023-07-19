import { BaseUrl } from '../../base.url';

export abstract class SRServersURL {
  static get basic(): string {
    return `${BaseUrl.aiop_service}/SRServers`;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}`;
  }
  static sync(id: string): string {
    return `${this.basic}/${id}/Sync`;
  }
}
