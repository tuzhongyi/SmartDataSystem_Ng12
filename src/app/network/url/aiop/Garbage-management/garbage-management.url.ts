import { BaseAiopUrl } from '../../base.url';

export abstract class GarbageManagementUrl {
  static get basic(): string {
    return `${BaseAiopUrl}/garbage_management`;
  }
}
