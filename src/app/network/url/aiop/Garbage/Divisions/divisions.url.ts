import { GarbageUrl } from '../garbage.url';

export class DivisionsUrl extends GarbageUrl {
  static get basic(): string {
    return `${super.basic}/Divisions`;
  }
}
