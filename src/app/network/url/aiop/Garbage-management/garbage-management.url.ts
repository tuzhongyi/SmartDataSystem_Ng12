import { BaseAiopUrl } from '../../base.url';

export abstract class GarbageManagementURL {
  static get basic(): string {
    return `${BaseAiopUrl}/garbage_management`;
  }
}
