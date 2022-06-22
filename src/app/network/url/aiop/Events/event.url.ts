import { BaseAiopUrl } from '../../base.url';

export abstract class EventUrl {

  protected static get basic(): string {
    return `${BaseAiopUrl}/Events`;

  }
}