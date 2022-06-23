import { BaseAiopUrl } from '../../base.url';

export abstract class EventsUrl {

  protected static get basic(): string {
    return `${BaseAiopUrl}/Events`;

  }
}