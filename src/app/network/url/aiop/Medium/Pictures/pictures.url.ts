import { MediumUrl } from '../medium.url';

export class PicturesUrl extends MediumUrl {
  static get basic(): string {
    return `${super.basic}/Pictures`;
  }
  static get binary() {
    return `${this.basic}/Binary`;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static jpg(id: string) {
    return `${this.item(id)}.jpg`;
  }
  static data(id: string) {
    return `${this.item(id)}/Data`;
  }
}
