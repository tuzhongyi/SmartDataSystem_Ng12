import { BaseUrl } from '../../base.url';

export abstract class PlatformsURL {
  protected static get basic(): string {
    return `${BaseUrl.aiop_service}/Platforms`;
  }

  static create() {
    return this.basic;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }
  static sync(id: string): string {
    return `${this.basic}/${id}/Sync`;
  }
  static protocols() {
    return `${this.basic}/Protocols`;
  }
}
