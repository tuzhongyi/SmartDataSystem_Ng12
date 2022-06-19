import { BaseAiopUrl } from '../../base.url';

export abstract class PlatformsURL {
  static get basic(): string {
    return `${BaseAiopUrl}/Platforms`;
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
