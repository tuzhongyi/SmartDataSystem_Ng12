import { EventsUrl } from '../events.url';

export abstract class RecordsUrl extends EventsUrl {
  static get basic(): string {
    return `${super.basic}/Records`;
  }
}
