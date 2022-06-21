import { BaseAiopUrl } from '../../base.url';

export abstract class RegionsURL {
  static get basic(): string {
    return `${BaseAiopUrl}/Regions`;
  }

  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }

}
