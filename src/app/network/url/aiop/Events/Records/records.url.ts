import { BaseAiopUrl } from "../../../base.url";
import { EventUrl } from "../event.url";

export abstract class RecordsUrl extends EventUrl {
  protected static get basic(): string {
    return `${super.basic}/Records`;

  }
}