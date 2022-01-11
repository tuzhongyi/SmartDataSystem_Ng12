import { InnerUrl } from '../../base.url';

export class PictureInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Pictures`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  binary() {
    return `${this.basic()}/Binary`;
  }

  data(id: string) {
    return `${this.item(id)}/Data`;
  }

  jpg(id: string) {
    return `${this.item(id)}.jpg`;
  }
}
