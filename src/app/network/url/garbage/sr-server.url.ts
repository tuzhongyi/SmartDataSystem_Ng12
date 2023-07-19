import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export class SRServiceUrl extends AbstractUrl {
  private static url = new SRServiceUrl(
    `${BaseUrl.garbage.garbage_management}/SRServers`
  );
  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }
  static sync(id: string) {
    return `${this.item(id)}/Sync`;
  }
  static preview() {
    return `${this.basic()}/PreviewUrls`;
  }
  static vod() {
    return `${this.basic()}/VodUrls`;
  }
}
