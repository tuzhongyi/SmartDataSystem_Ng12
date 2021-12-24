import { BaseAiopUrl } from '../../base.url';

export class GarbageUrl {
  static get basic(): string {
    return `${BaseAiopUrl}/garbage_management`;
  }
}
