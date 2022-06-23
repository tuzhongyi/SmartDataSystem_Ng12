import { BaseAiopUrl } from "../../../base.url";
import { EventsUrl } from "../events.url";

export abstract class RecordsUrl extends EventsUrl {
  protected static get basic(): string {
    return `${super.basic}/Records`;

  }
}