import { BaseAiopUrl } from '../../base.url';

export abstract class GarbageManagementURL {
  protected static get basic(): string {
    return `${BaseAiopUrl}/garbage_management`;
  }
}
