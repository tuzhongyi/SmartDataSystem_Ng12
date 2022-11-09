import { BasicUrl } from '../../base.url';

export abstract class EventsUrl {
  static get basic(): string {
    return `${BasicUrl.aiop}/Events`;
  }
}
