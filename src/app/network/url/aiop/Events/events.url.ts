import { BaseUrl } from '../../base.url';

export abstract class EventsUrl {
  static get basic(): string {
    return `${BaseUrl.aiop_service}/Events`;
  }
}
